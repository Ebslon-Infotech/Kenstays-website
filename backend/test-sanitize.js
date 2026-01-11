/**
 * Test script to verify passport sanitization
 */

const tekTravelsService = require('./services/tekTravelsService');

console.log('=== Testing Passport Sanitization ===\n');

// Test Case 1: Passport with tab character
const passengerWithTab = {
  FirstName: 'John',
  LastName: 'Doe',
  PassportNo: '\t123456789',
  Email: 'john@example.com',
  AddressLine1: 'Test\tAddress'
};

console.log('Test 1: Passport with tab character');
console.log('Before:', JSON.stringify(passengerWithTab));
const sanitized1 = tekTravelsService.sanitizePassengerData(passengerWithTab);
console.log('After:', JSON.stringify(sanitized1));
console.log('✅ Tab removed:', sanitized1.PassportNo === '123456789');
console.log('');

// Test Case 2: Passport with spaces
const passengerWithSpaces = {
  FirstName: 'Jane  ',
  LastName: '  Smith',
  PassportNo: '  ABC 123 456  ',
  Email: 'jane@example.com'
};

console.log('Test 2: Passport with spaces');
console.log('Before:', JSON.stringify(passengerWithSpaces));
const sanitized2 = tekTravelsService.sanitizePassengerData(passengerWithSpaces);
console.log('After:', JSON.stringify(sanitized2));
console.log('✅ Spaces removed:', sanitized2.PassportNo === 'ABC123456');
console.log('');

// Test Case 3: Multiple line breaks and tabs
const passengerWithMultiple = {
  FirstName: 'Test\n\nName',
  LastName: 'User',
  PassportNo: '\t\n\rXYZ789\t\n',
  AddressLine1: 'Line\tOne\nLine\rTwo'
};

console.log('Test 3: Multiple special characters');
console.log('Before:', JSON.stringify(passengerWithMultiple));
const sanitized3 = tekTravelsService.sanitizePassengerData(passengerWithMultiple);
console.log('After:', JSON.stringify(sanitized3));
console.log('✅ All special chars cleaned:', sanitized3.PassportNo === 'XYZ789');
console.log('✅ Address cleaned:', sanitized3.AddressLine1 === 'Line One Line Two');
console.log('');

// Test Case 4: Already clean data
const cleanPassenger = {
  FirstName: 'Clean',
  LastName: 'Data',
  PassportNo: 'CLEAN123',
  Email: 'clean@example.com'
};

console.log('Test 4: Already clean data');
console.log('Before:', JSON.stringify(cleanPassenger));
const sanitized4 = tekTravelsService.sanitizePassengerData(cleanPassenger);
console.log('After:', JSON.stringify(sanitized4));
console.log('✅ Data unchanged:', JSON.stringify(sanitized4) === JSON.stringify(cleanPassenger));
console.log('');

console.log('=== All Tests Completed ===');
