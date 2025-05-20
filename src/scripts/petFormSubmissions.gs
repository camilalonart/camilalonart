// Google Apps Script for handling pet photography form submissions
// This script should be deployed as a web app

// Configuration
const PET_SPREADSHEET_ID = '13beDRAZgmpHmAdL9-8cglOVbKTdGu2t2rz4KrGqDcp0'; // Your Pet Photography Google Sheet ID

// Sheet names for different packages
const PET_SHEET_NAMES = {
  'At Home Sessions': 'At Home Sessions',
  'Outdoor Session': 'Outdoor Sessions',
  'Pet Photobooks': 'Pet Photobooks'
};

// Common utilities
function getSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(PET_SPREADSHEET_ID);
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
    'Pet Name',
    'Pet Type',
    'Pet Age',
    'Package',
    'Preferred Date',
    'Location',
    'Message',
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
    
    if (data.type !== 'pet') {
      throw new Error('Invalid inquiry type');
    }
    
    return handlePetInquiry(data);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle pet photography inquiries
function handlePetInquiry(data) {
  try {
    const sheetName = PET_SHEET_NAMES[data.package] || 'Other Pet Inquiries';
    const sheet = getSheet(sheetName);
    
    // Append data
    sheet.appendRow([
      formatTimestamp(),
      data.name,
      data.email,
      data.phone || 'N/A',
      data.petName || 'N/A',
      data.petType || 'N/A',
      data.petAge || 'N/A',
      data.package || 'N/A',
      data.preferredDate || 'N/A',
      data.location || 'N/A',
      data.message || 'N/A',
      'New'
    ]);
    
    sendEmailNotification(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Pet photography inquiry submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.message || 'Failed to process inquiry'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Pet form submission endpoint is working'
  })).setMimeType(ContentService.MimeType.JSON);
}

function sendEmailNotification(data) {
  const subject = 'New Pet Photography Inquiry';
  
  // Send to admin
  GmailApp.sendEmail(
    'bycamilalonart@gmail.com',
    subject,
    '',
    {
      htmlBody: getPetEmailTemplate(data),
      name: 'Camilo Nart Photography',
      replyTo: data.email,
      noReply: true
    }
  );

  // Send confirmation to client
  GmailApp.sendEmail(
    data.email,
    'Thank you for your inquiry - Camilo Nart Photography',
    '',
    {
      htmlBody: getClientConfirmationTemplate(data),
      name: 'Camilo Nart Photography',
      noReply: true
    }
  );
}

function getPetEmailTemplate(data) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Pet Photography Inquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Pet's Name:</strong> ${data.petName}</p>
      <p><strong>Pet Type:</strong> ${data.petType}</p>
      <p><strong>Pet Age:</strong> ${data.petAge || 'Not specified'}</p>
      <p><strong>Package:</strong> ${data.package}</p>
      <p><strong>Preferred Date:</strong> ${data.preferredDate || 'Not specified'}</p>
      <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
      <p><strong>Message:</strong> ${data.message || 'Not provided'}</p>
    </div>
  `;
}

function getClientConfirmationTemplate(data) {
  const packageInfo = getPetPackageInfo(data.package);
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Thank You for Your Inquiry</h2>
      <p>Dear ${data.name},</p>
      <p>Thank you for your interest in our pet photography services. We have received your inquiry and will get back to you soon.</p>
      <p>Here's a summary of your inquiry:</p>
      <p><strong>Package:</strong> ${data.package}</p>
      ${packageInfo}
      <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
      <p>Best regards,<br>Camilo Nart Photography</p>
    </div>
  `;
}

function getPetPackageInfo(packageType) {
  const packages = {
    'At Home Sessions': '1-hour studio session, 25 edited high-resolution images.',
    'Outdoor Session': '1-hour outdoor session, 25 edited high-resolution images.',
    'Pet Photobooks': 'Custom design with your favorite images, 8x8in - 20 spreads (40 pages).'
  };
  return `<p><strong>Package Details:</strong> ${packages[packageType] || ''}</p>`;
} 