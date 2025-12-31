const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testFlightSearch() {
  try {
    console.log('Testing Flight Search API with TekTravels Integration...\n');
    
    // Test search with basic parameters - DEL to BOM (popular domestic route)
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

    console.log('Search Parameters:');
    console.log(JSON.stringify(searchData, null, 2));
    console.log('\nSending request to:', `${API_URL}/flights/search`);
    console.log('---\n');

    const response = await axios.post(`${API_URL}/flights/search`, searchData);

    if (response.data.success) {
      console.log('✅ Flight search successful!');
      console.log('TraceId:', response.data.data.traceId);
      
      // Handle nested results array from TekTravels
      const results = response.data.data.results || [];
      const flatResults = results.flat(); // Flatten nested arrays
      
      console.log('Results count:', flatResults.length);
      
      if (flatResults.length > 0) {
        console.log('\n--- First Flight Result (Sample) ---');
        const firstFlight = flatResults[0];
        
        // Display key information
        console.log('Result Index:', firstFlight.ResultIndex);
        console.log('Airline:', firstFlight.Segments?.[0]?.[0]?.Airline?.AirlineName);
        console.log('Flight Number:', firstFlight.Segments?.[0]?.[0]?.Airline?.FlightNumber);
        console.log('From:', firstFlight.Segments?.[0]?.[0]?.Origin?.Airport?.CityName);
        console.log('To:', firstFlight.Segments?.[0]?.[0]?.Destination?.Airport?.CityName);
        console.log('Departure:', firstFlight.Segments?.[0]?.[0]?.Origin?.DepTime);
        console.log('Arrival:', firstFlight.Segments?.[0]?.[0]?.Destination?.ArrTime);
        console.log('Fare (INR):', firstFlight.Fare?.OfferedFare);
        console.log('Refundable:', firstFlight.IsRefundable);
        
        console.log('\n--- Full First Result (truncated) ---');
        console.log(JSON.stringify(firstFlight, null, 2).substring(0, 2000)); // First 2000 chars
        console.log('...\n');
      } else {
        console.log('⚠️ No flights found for the given search criteria');
        console.log('This could be normal if:');
        console.log('- No flights operate on this route for the selected date');
        console.log('- The search date is too far in the future');
        console.log('- There are no available seats');
      }
    } else {
      console.log('❌ Search failed:', response.data.message);
    }

  } catch (error) {
    console.error('❌ Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the test
testFlightSearch();
