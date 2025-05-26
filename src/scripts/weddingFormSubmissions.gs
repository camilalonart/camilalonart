// Google Apps Script for handling wedding photography form submissions
// This script should be deployed as a web app

// Configuration
const WEDDING_SPREADSHEET_ID = 'YOUR_WEDDING_SPREADSHEET_ID'; // Replace with your Wedding Photography Google Sheet ID

// Sheet names for different packages
const WEDDING_SHEET_NAMES = {
  'Elopement': 'Elopements',
  'Engagement': 'Engagements',
  'Couples': 'Couples',
  'Photobooks': 'Photobooks',
  'Wedding Photography': 'Weddings'
};

// Common utilities
function getSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(WEDDING_SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    setupSheetHeaders(sheet);
  }
  
  return sheet;
}

function setupSheetHeaders(sheet) {
  sheet.appendRow([
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Package',
    'Date',
    'Location',
    'About You',
    'Message',
    'How Did You Hear About Us',
    'Status'
  ]);
}

function formatTimestamp() {
  const date = new Date();
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'MM/dd/yyyy HH:mm:ss');
}

// Handle POST requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.type !== 'wedding') {
      throw new Error('Invalid inquiry type');
    }
    
    return handleWeddingInquiry(data);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle wedding photography inquiries
function handleWeddingInquiry(data) {
  const sheetName = WEDDING_SHEET_NAMES[data.package] || 'Other Wedding Inquiries';
  const sheet = getSheet(sheetName);
  
  // Append data
  sheet.appendRow([
    formatTimestamp(),
    data.name,
    data.email,
    data.phone || 'N/A',
    data.package || 'N/A',
    data.date || 'N/A',
    data.location || 'N/A',
    data.aboutYou || 'N/A',
    data.message || 'N/A',
    data.hearAboutUs || 'N/A',
    'New'
  ]);
  
  sendEmailNotification(data);
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Wedding inquiry submitted successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle GET requests (for testing)
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Wedding form submission endpoint is working'
  })).setMimeType(ContentService.MimeType.JSON);
}

function sendEmailNotification(data) {
  const subject = 'New Wedding Photography Inquiry';
  
  // Send to admin
  GmailApp.sendEmail(
    'bycamilalonart@gmail.com',
    subject,
    '',
    {
      htmlBody: getWeddingEmailTemplate(data),
      name: 'Camilalonart Photography',
      replyTo: data.email,
      noReply: true
    }
  );

  // Send confirmation to client
  GmailApp.sendEmail(
    data.email,
    'Thank you for your inquiry - Camilalonart Photography',
    '',
    {
      htmlBody: getClientConfirmationTemplate(data),
      name: 'Camilalonart Photography',
      noReply: true
    }
  );
}

function getWeddingEmailTemplate(data) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Wedding Photography Inquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Package:</strong> ${data.package}</p>
      <p><strong>Date:</strong> ${data.date || 'Not specified'}</p>
      <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
      <p><strong>About You:</strong> ${data.aboutYou || 'Not provided'}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>How Did You Hear About Us:</strong> ${data.hearAboutUs || 'Not specified'}</p>
    </div>
  `;
}

function getClientConfirmationTemplate(data) {
  const packageInfo = getWeddingPackageInfo(data.package);
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Thank You for Your Inquiry</h2>
      <p>Dear ${data.name},</p>
      <p>Thank you for your interest in our wedding photography services. We have received your inquiry and will get back to you soon.</p>
      <p>Here's a summary of your inquiry:</p>
      <p><strong>Package:</strong> ${data.package}</p>
      ${packageInfo}
      <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
      <p>Best regards,<br>Camilalonart Photography</p>
    </div>
  `;
}

function getWeddingPackageInfo(packageType) {
  const packages = {
    'Elopement': 'Includes 4 hours of coverage, 200+ edited photos, and an online gallery.',
    'Engagement': 'Includes 1-hour session, 50+ edited photos, and an online gallery.',
    'Couples': 'Includes 1-hour session, 50+ edited photos, and an online gallery.',
    'Photobooks': 'Custom designed photobook with your favorite images.'
  };
  return `<p><strong>Package Details:</strong> ${packages[packageType] || ''}</p>`;
} 