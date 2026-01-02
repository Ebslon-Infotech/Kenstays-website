/**
 * Test script for SSR (Special Service Request) API
 * 
 * This script tests the SSR endpoint which provides:
 * - Baggage options
 * - Meal options
 * - Seat selection
 * 
 * Run: node test-ssr.js
 */

require('dotenv').config();
const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

// Test data - you need to get these from a valid flight search
const TEST_DATA = {
  // Replace these with actual values from a flight search
  traceId: 'f140170f-2b71-4b51-9cec-423a8f0bfef3',
  resultIndex: 'OB2[TBO]ZJfnrNr3lGdOyRzztpRBmpqAnpA8mmd12UtfkktuuMcRXXF+7PK+/bnF1gS0v+UoWfYG'
};

/**
 * Test SSR API
 */
async function testSSR() {
  console.log('\n🧪 Testing SSR API...\n');
  console.log('Endpoint:', `${API_BASE_URL}/flights/ssr`);
  console.log('TraceId:', TEST_DATA.traceId);
  console.log('ResultIndex:', TEST_DATA.resultIndex.substring(0, 50) + '...');
  console.log('---\n');

  try {
    const response = await axios.post(
      `${API_BASE_URL}/flights/ssr`,
      {
        traceId: TEST_DATA.traceId,
        resultIndex: TEST_DATA.resultIndex
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    if (response.data && response.data.success) {
      const ssrData = response.data.data;
      
      console.log('✅ SSR Request Successful!\n');
      console.log('Carrier Type:', ssrData.isLCC ? 'LCC (Low-Cost Carrier)' : 'Non-LCC');
      console.log('TraceId:', ssrData.traceId);
      console.log('Response Status:', ssrData.responseStatus.status ? 'Success' : 'Failed');
      console.log('---\n');

      if (ssrData.isLCC) {
        // LCC Response
        console.log('🧳 BAGGAGE OPTIONS:\n');
        if (ssrData.baggage && ssrData.baggage.length > 0) {
          const baggageOptions = ssrData.baggage[0] || [];
          baggageOptions.forEach((bag, index) => {
            console.log(`  ${index + 1}. Code: ${bag.Code}`);
            console.log(`     Weight: ${bag.Weight} kg`);
            console.log(`     Price: ${bag.Currency} ${bag.Price}`);
            console.log(`     Route: ${bag.Origin} → ${bag.Destination}`);
            console.log(`     Flight: ${bag.AirlineCode} ${bag.FlightNumber}`);
            console.log(`     Description: ${bag.Description === 1 ? 'Included' : bag.Description === 2 ? 'Purchase' : 'Other'}`);
            console.log('');
          });
        } else {
          console.log('  No baggage options available\n');
        }

        console.log('🍽️  MEAL OPTIONS:\n');
        if (ssrData.mealDynamic && ssrData.mealDynamic.length > 0) {
          const mealOptions = ssrData.mealDynamic[0] || [];
          mealOptions.forEach((meal, index) => {
            console.log(`  ${index + 1}. Code: ${meal.Code}`);
            console.log(`     Description: ${meal.AirlineDescription || meal.Code}`);
            console.log(`     Price: ${meal.Currency} ${meal.Price}`);
            console.log(`     Route: ${meal.Origin} → ${meal.Destination}`);
            console.log(`     Flight: ${meal.AirlineCode} ${meal.FlightNumber}`);
            console.log('');
          });
        } else {
          console.log('  No meal options available\n');
        }

        console.log('💺 SEAT OPTIONS:\n');
        if (ssrData.seatDynamic && ssrData.seatDynamic.length > 0) {
          let seatCount = 0;
          const seatData = ssrData.seatDynamic[0];
          
          if (seatData.SegmentSeat) {
            seatData.SegmentSeat.forEach(segment => {
              if (segment.RowSeats) {
                segment.RowSeats.forEach(row => {
                  if (row.Seats) {
                    row.Seats.forEach(seat => {
                      if (seat.Code !== 'NoSeat' && seat.AvailablityType === 1) {
                        seatCount++;
                        if (seatCount <= 5) { // Show first 5 seats
                          console.log(`  Seat: ${seat.SeatNo} (Row ${seat.RowNo})`);
                          console.log(`    Type: ${seat.SeatType === 1 ? 'Window' : seat.SeatType === 2 ? 'Aisle' : 'Middle'}`);
                          console.log(`    Price: ${seat.Currency} ${seat.Price}`);
                          console.log(`    Flight: ${seat.AirlineCode} ${seat.FlightNumber}`);
                          console.log('');
                        }
                      }
                    });
                  }
                });
              }
            });
          }
          
          if (seatCount > 5) {
            console.log(`  ... and ${seatCount - 5} more seats available\n`);
          } else if (seatCount === 0) {
            console.log('  No seat selection available\n');
          }
        } else {
          console.log('  No seat options available\n');
        }

        if (ssrData.specialServices && ssrData.specialServices.length > 0) {
          console.log('✨ SPECIAL SERVICES:\n');
          ssrData.specialServices.forEach((service, index) => {
            console.log(`  ${index + 1}. Special service available`);
            console.log('');
          });
        }

      } else {
        // Non-LCC Response
        console.log('🍽️  MEAL PREFERENCES (Indicative):\n');
        if (ssrData.meal && ssrData.meal.length > 0) {
          ssrData.meal.forEach((meal, index) => {
            console.log(`  ${index + 1}. ${meal.Code} - ${meal.Description}`);
          });
          console.log('');
        } else {
          console.log('  No meal preferences available\n');
        }

        console.log('💺 SEAT PREFERENCES (Indicative):\n');
        if (ssrData.seatPreference && ssrData.seatPreference.length > 0) {
          ssrData.seatPreference.forEach((seat, index) => {
            console.log(`  ${index + 1}. ${seat.Code} - ${seat.Description}`);
          });
          console.log('');
        } else {
          console.log('  No seat preferences available\n');
        }

        console.log('ℹ️  Note: For Non-LCC carriers, meal and seat selections are indicative only.');
        console.log('   The airline will try to accommodate preferences based on availability.\n');
      }

      // Error information
      if (ssrData.error && ssrData.error.ErrorCode !== 0) {
        console.log('⚠️  API Error:');
        console.log(`   Code: ${ssrData.error.ErrorCode}`);
        console.log(`   Message: ${ssrData.error.ErrorMessage}\n`);
      }

      console.log('---');
      console.log('✅ SSR Test Completed Successfully!');
      console.log('---\n');

      // Return data for potential further processing
      return ssrData;

    } else {
      throw new Error('Invalid response from SSR API');
    }

  } catch (error) {
    console.error('❌ SSR Test Failed!\n');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data?.message || error.response.data);
    } else if (error.request) {
      console.error('No response received from server');
      console.error('Make sure the backend server is running on', API_BASE_URL);
    } else {
      console.error('Error:', error.message);
    }
    
    console.log('\n💡 Troubleshooting Tips:');
    console.log('1. Ensure backend server is running: cd backend && npm start');
    console.log('2. Verify TraceId and ResultIndex are from a recent flight search');
    console.log('3. Check that .env file has correct TekTravels API credentials');
    console.log('4. TraceId expires after some time, perform a new flight search if needed\n');
    
    throw error;
  }
}

/**
 * Test Air Amendment SSR (after booking)
 */
async function testAirAmendmentSSR(bookingId) {
  console.log('\n🧪 Testing Air Amendment SSR API...\n');
  console.log('Endpoint:', `${API_BASE_URL}/flights/ssr`);
  console.log('BookingId:', bookingId);
  console.log('---\n');

  try {
    const response = await axios.post(
      `${API_BASE_URL}/flights/ssr`,
      {
        bookingId: bookingId
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    if (response.data && response.data.success) {
      console.log('✅ Air Amendment SSR Request Successful!\n');
      console.log('Data:', JSON.stringify(response.data.data, null, 2));
      console.log('\n---');
      return response.data.data;
    } else {
      throw new Error('Invalid response from Air Amendment SSR API');
    }

  } catch (error) {
    console.error('❌ Air Amendment SSR Test Failed!\n');
    console.error('Error:', error.response?.data?.message || error.message);
    throw error;
  }
}

// Run tests
async function runTests() {
  console.log('\n=================================================');
  console.log('   SSR API Test Suite');
  console.log('=================================================\n');

  try {
    // Test 1: Initial SSR request
    await testSSR();

    // Test 2: Air Amendment SSR (uncomment when you have a valid booking ID)
    // await testAirAmendmentSSR(1599626);

    console.log('\n=================================================');
    console.log('   All Tests Completed!');
    console.log('=================================================\n');

  } catch (error) {
    console.log('\n=================================================');
    console.log('   Tests Failed');
    console.log('=================================================\n');
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  runTests();
}

module.exports = { testSSR, testAirAmendmentSSR };
