const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data from documentation
const testBookRequest = {
  traceId: '', // Will be filled from search response
  resultIndex: '', // Will be filled from search response
  passengers: [{
    Title: 'Mr',
    FirstName: 'John',
    LastName: 'Doe',
    PaxType: 1, // 1=Adult, 2=Child, 3=Infant
    DateOfBirth: '1987-12-06T00:00:00',
    Gender: 1, // 1=Male, 2=Female
    PassportNo: 'ABC123456',
    PassportExpiry: '2028-12-06T00:00:00',
    AddressLine1: '123, Test Street',
    AddressLine2: '',
    City: 'New York',
    CountryCode: 'US',
    CountryName: 'United States',
    ContactNo: '1234567890',
    Email: 'john.doe@example.com',
    IsLeadPax: true,
    Nationality: 'US',
    FFAirlineCode: null,
    FFNumber: '',
    GSTCompanyAddress: '',
    GSTCompanyContactNumber: '',
    GSTCompanyName: '',
    GSTNumber: '',
    GSTCompanyEmail: '',
    CellCountryCode: '+1-',
    Fare: {
      Currency: 'USD',
      BaseFare: 300.00,
      Tax: 50.00,
      YQTax: 0.0,
      AdditionalTxnFeePub: 0.0,
      AdditionalTxnFeeOfrd: 0.0,
      OtherCharges: 10.00,
      Discount: 0.0,
      PublishedFare: 360.00,
      OfferedFare: 360.00,
      TdsOnCommission: 0.0,
      TdsOnPLB: 0.0,
      TdsOnIncentive: 0.0,
      ServiceFee: 0.0
    }
  }]
};

async function testCompleteFlightBooking() {
  try {
    console.log('=== Testing Complete Flight Booking Flow ===\n');

    // Step 1: Search for flights
    console.log('Step 1: Searching for flights...');
    const searchResponse = await axios.post(`${BASE_URL}/flights/search`, {
      origin: 'DEL',
      destination: 'BOM',
      departureDate: '2026-02-15',
      adults: 1,
      children: 0,
      infants: 0,
      cabinClass: 2,
      journeyType: 1,
      directFlight: false,
      oneStopFlight: false
    });

    if (!searchResponse.data.success) {
      console.error('Search failed:', searchResponse.data.message);
      return;
    }

    console.log('✓ Search successful');
    console.log('TraceId:', searchResponse.data.data.traceId);
    console.log('Results found:', searchResponse.data.data.results?.length || 0);

    if (!searchResponse.data.data.results || searchResponse.data.data.results.length === 0) {
      console.log('No flights found for the search criteria');
      return;
    }

    const traceId = searchResponse.data.data.traceId;
    const firstResult = searchResponse.data.data.results[0];
    const resultIndex = firstResult.ResultIndex;

    console.log('\nSelected Flight:');
    console.log('ResultIndex:', resultIndex);
    console.log('Airline:', firstResult.Segments?.[0]?.[0]?.Airline?.AirlineCode);
    console.log('Flight Number:', firstResult.Segments?.[0]?.[0]?.Airline?.FlightNumber);
    console.log('Price:', firstResult.Fare?.OfferedFare);

    // Step 2: Get Fare Quote
    console.log('\nStep 2: Getting fare quote...');
    const fareQuoteResponse = await axios.post(`${BASE_URL}/flights/fare-quote`, {
      traceId,
      resultIndex
    });

    if (!fareQuoteResponse.data.success) {
      console.error('Fare quote failed:', fareQuoteResponse.data.message);
      return;
    }

    console.log('✓ Fare quote successful');
    console.log('IsPriceChanged:', fareQuoteResponse.data.data.isPriceChanged);
    console.log('IsTimeChanged:', fareQuoteResponse.data.data.isTimeChanged);
    
    const fareQuoteResults = fareQuoteResponse.data.data.results;
    const fare = fareQuoteResults.Fare;
    const isPassportRequired = fareQuoteResults.IsPassportRequiredAtBook;
    const isPassportFullDetailRequired = fareQuoteResults.IsPassportFullDetailRequiredAtBook;

    console.log('Fare Details:');
    console.log('  BaseFare:', fare.BaseFare);
    console.log('  Tax:', fare.Tax);
    console.log('  OfferedFare:', fare.OfferedFare);
    console.log('  IsPassportRequiredAtBook:', isPassportRequired);

    // Step 3: Get SSR (Optional)
    console.log('\nStep 3: Getting SSR options...');
    try {
      const ssrResponse = await axios.post(`${BASE_URL}/flights/ssr`, {
        traceId,
        resultIndex
      });

      if (ssrResponse.data.success) {
        console.log('✓ SSR retrieved');
        console.log('IsLCC:', ssrResponse.data.data.isLCC);
        console.log('Baggage options:', ssrResponse.data.data.baggage?.length || 0);
        console.log('Meal options:', ssrResponse.data.data.mealDynamic?.length || 0);
      }
    } catch (ssrError) {
      console.log('SSR retrieval failed (optional step):', ssrError.response?.data?.message || ssrError.message);
    }

    // Step 4: Book the flight
    console.log('\nStep 4: Booking the flight...');
    
    // Update passenger fare with actual fare from quote
    testBookRequest.traceId = traceId;
    testBookRequest.resultIndex = resultIndex;
    testBookRequest.passengers[0].Fare = {
      Currency: fare.Currency,
      BaseFare: fare.BaseFare,
      Tax: fare.Tax,
      YQTax: fare.YQTax,
      AdditionalTxnFeePub: fare.AdditionalTxnFeePub || 0,
      AdditionalTxnFeeOfrd: fare.AdditionalTxnFeeOfrd || 0,
      OtherCharges: fare.OtherCharges || 0,
      Discount: fare.Discount || 0,
      PublishedFare: fare.PublishedFare,
      OfferedFare: fare.OfferedFare,
      TdsOnCommission: fare.TdsOnCommission || 0,
      TdsOnPLB: fare.TdsOnPLB || 0,
      TdsOnIncentive: fare.TdsOnIncentive || 0,
      ServiceFee: fare.ServiceFee || 0
    };

    // Update passport requirement based on fare quote
    if (!isPassportRequired) {
      delete testBookRequest.passengers[0].PassportNo;
      delete testBookRequest.passengers[0].PassportExpiry;
    }

    const bookResponse = await axios.post(`${BASE_URL}/flights/book`, testBookRequest);

    if (!bookResponse.data.success) {
      console.error('✗ Booking failed:', bookResponse.data.message);
      console.error('Error details:', bookResponse.data.data);
      return;
    }

    console.log('✓ Booking successful!');
    console.log('\nBooking Details:');
    console.log('PNR:', bookResponse.data.data.pnr);
    console.log('Booking ID:', bookResponse.data.data.bookingId);
    console.log('Status:', bookResponse.data.data.status);
    console.log('IsPriceChanged:', bookResponse.data.data.isPriceChanged);
    console.log('IsTimeChanged:', bookResponse.data.data.isTimeChanged);
    console.log('Last Ticket Date:', bookResponse.data.data.flightItinerary?.LastTicketDate);
    console.log('Saved to Database:', bookResponse.data.data.savedToDatabase);

    if (bookResponse.data.data.priceChanged) {
      console.log('\n⚠ Price Changed!');
      console.log('You need to call Book API again with updated fare');
    }

    if (bookResponse.data.data.timeChanged) {
      console.log('\n⚠ Time Changed!');
      console.log('Flight schedule has been updated');
    }

    console.log('\n=== Test Completed Successfully ===');
    console.log('\nNext Steps:');
    console.log('1. For Non-LCC: Call Ticket API to complete the booking');
    console.log('2. For LCC: Booking is automatically ticketed');
    console.log('3. Use GetBookingDetails API to check status');

  } catch (error) {
    console.error('\n✗ Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data.message);
      console.error('Details:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the test
testCompleteFlightBooking();
