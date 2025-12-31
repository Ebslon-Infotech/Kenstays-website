const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testFareRules() {
  try {
    console.log('Testing Fare Rules API with TekTravels Integration...\n');
    
    // Step 1: First, we need to search for flights to get a TraceId and ResultIndex
    console.log('Step 1: Searching for flights...');
    const today = new Date();
    today.setDate(today.getDate() + 7); // 7 days from now
    const searchDateStr = today.toISOString().split('T')[0];
    
    const searchData = {
      origin: 'DEL',
      destination: 'BOM',
      departureDate: searchDateStr,
      returnDate: '',
      adults: 1,
      children: 0,
      infants: 0,
      cabinClass: 2, // Economy
      journeyType: 1, // One-way
      directFlight: false,
      oneStopFlight: false,
      sources: null
    };

    const searchResponse = await axios.post(`${API_URL}/flights/search`, searchData);

    if (!searchResponse.data.success) {
      console.log('❌ Flight search failed:', searchResponse.data.message);
      return;
    }

    const traceId = searchResponse.data.data.traceId;
    const results = searchResponse.data.data.results || [];
    const flatResults = results.flat();

    if (flatResults.length === 0) {
      console.log('⚠️ No flights found. Cannot test fare rules without a valid flight result.');
      return;
    }

    console.log('✅ Flight search successful!');
    console.log('TraceId:', traceId);
    console.log('Results count:', flatResults.length);

    // Step 2: Get fare rules for the first flight
    const firstFlight = flatResults[0];
    const resultIndex = firstFlight.ResultIndex;

    console.log('\n---\n');
    console.log('Step 2: Getting fare rules...');
    console.log('Result Index:', resultIndex);
    console.log('Airline:', firstFlight.Segments?.[0]?.[0]?.Airline?.AirlineName);
    console.log('Flight:', firstFlight.Segments?.[0]?.[0]?.Airline?.AirlineCode + '-' + firstFlight.Segments?.[0]?.[0]?.Airline?.FlightNumber);

    const fareRulesData = {
      traceId: traceId,
      resultIndex: resultIndex
    };

    console.log('\nFare Rules Request:');
    console.log(JSON.stringify(fareRulesData, null, 2));

    const fareRulesResponse = await axios.post(`${API_URL}/flights/fare-rules`, fareRulesData);

    if (fareRulesResponse.data.success) {
      console.log('\n✅ Fare rules retrieved successfully!');
      console.log('TraceId:', fareRulesResponse.data.data.traceId);
      console.log('Fare rules count:', fareRulesResponse.data.data.fareRules?.length || 0);
      
      if (fareRulesResponse.data.data.fareRules && fareRulesResponse.data.data.fareRules.length > 0) {
        console.log('\n--- First Fare Rule (Summary) ---');
        const firstRule = fareRulesResponse.data.data.fareRules[0];
        
        console.log('Airline:', firstRule.Airline);
        console.log('Route:', firstRule.Origin + ' → ' + firstRule.Destination);
        console.log('Fare Basis Code:', firstRule.FareBasisCode);
        console.log('Fare Restriction:', firstRule.FareRestriction || 'None');
        
        console.log('\n--- Fare Rule Details (First 500 chars) ---');
        const ruleDetail = firstRule.FareRuleDetail || '';
        console.log(ruleDetail.substring(0, 500) + '...');
        
        console.log('\n--- Key Information Extracted ---');
        
        // Extract baggage info
        const baggageMatch = ruleDetail.match(/Check-in Baggage Allowance:([^\r\n]+)/i);
        if (baggageMatch) {
          console.log('✓ Check-in Baggage:', baggageMatch[1].trim());
        }
        
        const handBaggageMatch = ruleDetail.match(/Hand Baggage Allowance:([^\r\n]+)/i);
        if (handBaggageMatch) {
          console.log('✓ Hand Baggage:', handBaggageMatch[1].trim());
        }
        
        // Check for cancellation
        if (ruleDetail.toLowerCase().includes('cancellation')) {
          console.log('✓ Cancellation: Fees apply (see fare rules for details)');
        }
        
        // Check for changes
        if (ruleDetail.toLowerCase().includes('change fee')) {
          console.log('✓ Date Change: Fees apply (see fare rules for details)');
        }
        
        console.log('\n💡 Tip: View complete fare rules at: http://localhost:3000/flights/fare-details?resultIndex=' + encodeURIComponent(resultIndex) + '&traceId=' + encodeURIComponent(traceId));
        
      } else {
        console.log('⚠️ No fare rules found for this flight');
      }
    } else {
      console.log('❌ Fare rules request failed:', fareRulesResponse.data.message);
    }

  } catch (error) {
    console.error('\n❌ Test failed with error:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data?.message || error.response.statusText);
      console.error('Error:', error.response.data?.error || 'No additional error info');
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the test
console.log('========================================');
console.log('   FARE RULES API TEST');
console.log('========================================\n');

testFareRules()
  .then(() => {
    console.log('\n========================================');
    console.log('   TEST COMPLETED');
    console.log('========================================\n');
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
