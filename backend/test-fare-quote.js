const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data - you'll need to run a search first to get valid traceId and resultIndex
const testData = {
  traceId: 'YOUR_TRACE_ID_HERE', // Get this from search response
  resultIndex: 'YOUR_RESULT_INDEX_HERE' // Get this from search response (usually "0", "1", etc.)
};

async function testFareQuote() {
  console.log('🧪 Testing Fare Quote API...\n');

  try {
    // Step 1: First, let's do a search to get valid traceId and resultIndex
    console.log('📋 Step 1: Performing flight search...');
    const searchResponse = await axios.post(`${API_BASE_URL}/flights/search`, {
      origin: 'DEL',
      destination: 'BOM',
      departDate: '2024-03-15',
      adults: 1,
      children: 0,
      infants: 0,
      cabinClass: 1 // Economy
    });

    if (!searchResponse.data.responseStatus?.status) {
      console.error('❌ Search failed:', searchResponse.data.error);
      return;
    }

    console.log('✅ Search successful!');
    const traceId = searchResponse.data.traceId;
    const firstResult = searchResponse.data.results?.[0];
    
    if (!firstResult) {
      console.error('❌ No search results found');
      return;
    }

    const resultIndex = firstResult.ResultIndex;
    console.log(`   TraceId: ${traceId}`);
    console.log(`   ResultIndex: ${resultIndex}`);
    console.log(`   Flight: ${firstResult.Segments[0][0].Airline.AirlineCode} ${firstResult.Segments[0][0].Airline.FlightNumber}`);
    console.log(`   Price: ${firstResult.Fare.Currency} ${firstResult.Fare.PublishedFare}\n`);

    // Step 2: Get Fare Quote
    console.log('📋 Step 2: Getting Fare Quote...');
    const fareQuoteResponse = await axios.post(`${API_BASE_URL}/flights/fare-quote`, {
      traceId,
      resultIndex
    });

    if (!fareQuoteResponse.data.responseStatus?.status) {
      console.error('❌ Fare Quote failed:', fareQuoteResponse.data.error);
      return;
    }

    console.log('✅ Fare Quote retrieved successfully!\n');
    
    const fareQuote = fareQuoteResponse.data.results[0];
    
    // Display results
    console.log('═══════════════════════════════════════════════');
    console.log('FARE QUOTE DETAILS');
    console.log('═══════════════════════════════════════════════\n');

    // Price change check
    console.log('💰 Price Status:');
    console.log(`   Price Changed: ${fareQuote.IsPriceChanged ? '⚠️  YES' : '✅ NO'}`);
    console.log(`   Time Changed: ${fareQuote.IsTimeChanged ? '⚠️  YES' : '✅ NO'}\n`);

    // Total fare
    console.log('💵 Total Fare:');
    console.log(`   Currency: ${fareQuote.Fare.Currency}`);
    console.log(`   Base Fare: ${fareQuote.Fare.BaseFare}`);
    console.log(`   Tax: ${fareQuote.Fare.Tax}`);
    console.log(`   YQ Tax: ${fareQuote.Fare.YQTax}`);
    console.log(`   Published Fare: ${fareQuote.Fare.PublishedFare}`);
    console.log(`   Offered Fare: ${fareQuote.Fare.OfferedFare}\n`);

    // Fare breakdown by passenger
    console.log('👥 Fare Breakdown by Passenger:');
    fareQuote.Fare.FareBreakdown.forEach((breakdown) => {
      const passengerType = ['', 'Adult', 'Child', 'Infant'][breakdown.PassengerType] || 'Unknown';
      console.log(`\n   ${passengerType} (x${breakdown.PassengerCount}):`);
      console.log(`     Base Fare: ${breakdown.Currency} ${breakdown.BaseFare}`);
      console.log(`     Tax: ${breakdown.Currency} ${breakdown.Tax}`);
      console.log(`     YQ Tax: ${breakdown.Currency} ${breakdown.YQTax}`);
      const total = breakdown.BaseFare + breakdown.Tax + breakdown.YQTax;
      console.log(`     Total: ${breakdown.Currency} ${total}`);
    });

    // Flight segments
    console.log('\n\n✈️  Flight Segments:');
    fareQuote.Segments.forEach((segmentGroup, groupIndex) => {
      console.log(`\n   Journey ${groupIndex + 1}:`);
      segmentGroup.forEach((segment, segIndex) => {
        console.log(`   Segment ${segIndex + 1}:`);
        console.log(`     ${segment.Origin.Airport.AirportCode} → ${segment.Destination.Airport.AirportCode}`);
        console.log(`     ${segment.Airline.AirlineName} (${segment.Airline.AirlineCode} ${segment.Airline.FlightNumber})`);
        console.log(`     Departure: ${new Date(segment.DepTime).toLocaleString()}`);
        console.log(`     Arrival: ${new Date(segment.ArrTime).toLocaleString()}`);
        console.log(`     Duration: ${Math.floor(segment.Duration / 60)}h ${segment.Duration % 60}m`);
      });
    });

    console.log('\n═══════════════════════════════════════════════');
    console.log('✅ Fare Quote Test Completed Successfully!');
    console.log('═══════════════════════════════════════════════\n');

    // Next steps
    console.log('📌 Next Steps:');
    console.log('   1. If price is acceptable, proceed to SSR (Seat/Meal/Baggage selection)');
    console.log('   2. Then proceed to Book API to create booking');
    console.log('   3. Finally use Ticket API to confirm and get ticket\n');

  } catch (error) {
    console.error('\n❌ Error during test:');
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Message:', error.response.data.error || error.response.data.message);
      if (error.response.data.details) {
        console.error('   Details:', error.response.data.details);
      }
    } else {
      console.error('   ', error.message);
    }
  }
}

// Run the test
console.log('Starting Fare Quote API Test...\n');
testFareQuote();
