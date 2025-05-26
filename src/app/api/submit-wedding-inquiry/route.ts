import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import getConfig from 'next/config';
import { headers } from 'next/headers';
import crypto from 'crypto';

const { serverRuntimeConfig } = getConfig();

// Security Constants
const MAX_PAYLOAD_SIZE = 1024 * 50; // 50KB max payload
const ALLOWED_METHODS = ['POST'];
const REQUIRED_CONTENT_TYPE = 'application/json';
const CORS_ORIGINS = ['https://camilalonart.com']; // Add your domains

// Rate limiting with Redis-like structure (in-memory for demo)
const RATE_LIMIT = {
  WINDOW_MS: 60 * 1000, // 1 minute
  MAX_REQUESTS: 5,
  BLOCK_DURATION: 60 * 60 * 1000, // 1 hour block for abuse
};

interface RateLimitEntry {
  count: number;
  timestamp: number;
  blocked?: boolean;
  blockExpiry?: number;
}

const ipRequestCounts = new Map<string, RateLimitEntry>();

// Security utility functions
function generateRequestId(): string {
  return crypto.randomBytes(16).toString('hex');
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML/XML tags
    .replace(/[;{}]/g, '') // Remove potential script indicators
    .trim();
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length < 255;
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]{10,20}$/;
  return phoneRegex.test(phone);
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  // Check if IP is blocked
  if (entry?.blocked && entry.blockExpiry && entry.blockExpiry > now) {
    return true;
  }

  // Reset blocked status if block expired
  if (entry?.blocked && entry.blockExpiry && entry.blockExpiry <= now) {
    entry.blocked = false;
    entry.blockExpiry = undefined;
  }

  if (!entry) {
    ipRequestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  // Reset window if expired
  if (now - entry.timestamp > RATE_LIMIT.WINDOW_MS) {
    entry.count = 1;
    entry.timestamp = now;
    return false;
  }

  // Block IP if consistently hitting rate limit
  if (entry.count >= RATE_LIMIT.MAX_REQUESTS * 2) {
    entry.blocked = true;
    entry.blockExpiry = now + RATE_LIMIT.BLOCK_DURATION;
    return true;
  }

  entry.count++;
  return entry.count > RATE_LIMIT.MAX_REQUESTS;
}

// Logging utility
function secureLog(message: string, data: any, requestId: string) {
  // Remove sensitive data
  const sanitizedData = { ...data };
  delete sanitizedData.email;
  delete sanitizedData.phone;
  delete sanitizedData.name;
  
  console.log({
    timestamp: new Date().toISOString(),
    requestId,
    message,
    ...sanitizedData
  });
}

export async function POST(req: Request) {
  const requestId = generateRequestId();
  const headersList = headers();
  
  try {
    // 1. Basic Request Validation
    if (!ALLOWED_METHODS.includes(req.method)) {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }

    // 2. Content-Type Validation
    const contentType = headersList.get('content-type');
    if (!contentType?.includes(REQUIRED_CONTENT_TYPE)) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 415 }
      );
    }

    // 3. CORS Validation
    const origin = headersList.get('origin');
    if (origin && !CORS_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      );
    }

    // 4. IP Rate Limiting
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    
    if (isRateLimited(ip)) {
      secureLog('Rate limit exceeded', { ip }, requestId);
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // 5. Payload Size Validation
    const rawBody = await req.text();
    if (rawBody.length > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        { error: 'Payload too large' },
        { status: 413 }
      );
    }

    // 6. JSON Parsing with Try-Catch
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    // 7. Input Validation and Sanitization
    const {
      name,
      email,
      phone,
      date,
      package: packageType,
      location,
      aboutYou,
      message,
      hearAboutUs,
    } = body;

    // Required fields validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phone validation
    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: email.toLowerCase(),
      phone: sanitizeInput(phone),
      date: date ? sanitizeInput(date) : '',
      package: sanitizeInput(packageType),
      location: location ? sanitizeInput(location) : '',
      aboutYou: aboutYou ? sanitizeInput(aboutYou) : '',
      message: sanitizeInput(message),
      hearAboutUs: hearAboutUs ? sanitizeInput(hearAboutUs) : '',
    };

    // 8. Google Sheets Integration with Error Handling
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serverRuntimeConfig.GOOGLE_CLIENT_EMAIL,
        private_key: serverRuntimeConfig.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get sheet name based on package type
    const getSheetName = (packageType: string): string => {
      const sheetMap: { [key: string]: string } = {
        'Elopement': 'Elopements',
        'Engagement': 'Engagements',
        'Couples': 'Couples',
        'Photobooks': 'Photobooks',
        'Wedding Photography': 'Weddings'
      };
      return sheetMap[packageType] || 'Other Inquiries';
    };

    const sheetName = getSheetName(sanitizedData.package);
    const submissionDate = new Date().toISOString();

    // Prepare row data with sanitized values
    const values = [
      [
        submissionDate,
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.phone,
        sanitizedData.package,
        sanitizedData.date || 'Not specified',
        sanitizedData.location || 'Not specified',
        sanitizedData.aboutYou || 'Not provided',
        sanitizedData.message,
        sanitizedData.hearAboutUs || 'Not specified',
      ],
    ];

    // Append to Google Sheet with error handling
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: serverRuntimeConfig.GOOGLE_SHEET_ID,
        range: `${sheetName}!A:J`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });
    } catch (error) {
      secureLog('Google Sheets API error', { error }, requestId);
      throw new Error('Failed to save inquiry');
    }

    // 9. Success Response
    secureLog('Inquiry submitted successfully', { sheetName }, requestId);
    return NextResponse.json({ 
      success: true,
      requestId // Include requestId for tracking
    });

  } catch (error) {
    // 10. Error Handling
    secureLog('Error processing inquiry', { error }, requestId);
    return NextResponse.json(
      { 
        error: 'Failed to submit form',
        requestId // Include requestId for tracking
      },
      { status: 500 }
    );
  }
} 