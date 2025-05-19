// Google Apps Script for handling form submissions
// This script should be deployed as a web app

// Configuration
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheet ID
const WEDDING_SHEET_NAME = 'Wedding Inquiries';
const PET_SHEET_NAME = 'Pet Inquiries';

// Common utilities
function getSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  
  return sheet;
}

function formatTimestamp() {
  const date = new Date();
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'MM/dd/yyyy HH:mm:ss');
}

// Handle POST requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type;
    
    if (type === 'wedding') {
      return handleWeddingInquiry(data);
    } else if (type === 'pet') {
      return handlePetInquiry(data);
    } else {
      throw new Error('Invalid inquiry type');
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle wedding photography inquiries
function handleWeddingInquiry(data) {
  const sheet = getSheet(WEDDING_SHEET_NAME);
  
  // Set headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Wedding Date',
      'Venue',
      'Package',
      'Guest Count',
      'Message',
      'Status'
    ]);
  }
  
  // Append data
  sheet.appendRow([
    formatTimestamp(),
    data.name,
    data.email,
    data.phone || 'N/A',
    data.weddingDate || 'N/A',
    data.venue || 'N/A',
    data.package || 'N/A',
    data.guestCount || 'N/A',
    data.message || 'N/A',
    'New'
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Wedding inquiry submitted successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle pet photography inquiries
function handlePetInquiry(data) {
  const sheet = getSheet(PET_SHEET_NAME);
  
  // Set headers if sheet is empty
  if (sheet.getLastRow() === 0) {
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
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Pet photography inquiry submitted successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle GET requests (for testing)
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Form submission endpoint is working'
  })).setMimeType(ContentService.MimeType.JSON);
} 