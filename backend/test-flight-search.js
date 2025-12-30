const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testFlightSearch() {
  try {
    console.log('Testing Flight Search API...\n');
    
    // Test search with basic parameters - DEL to GOI (popular route)
    const today = new Date();
    today.setDate(today.getDate() + 7); // 7 days from now
    const searchDateStr = today.toISOString().split('T')[0];
    
    const searchData = {
      origin: 'DEL',
      destination: 'GOI',
      departureDate: searchDateStr,
      returnDate: '',
      adults: 1,
      children: 0,
      infants: 0,
      cabinClass: 2,
      journeyType: 1,
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
      console.log('Results count:', response.data.data.results?.length || 0);
      
      if (response.data.data.results && response.data.data.results.length > 0) {
        console.log('\n--- First Flight Result (Full Structure) ---');
        const firstFlight = response.data.data.results[0];
        console.log(JSON.stringify(firstFlight, null, 2).substring(0, 2000)); // First 2000 chars
        console.log('...\n');
      } else {
        console.log('⚠️ No flights found for the given search criteria');
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
