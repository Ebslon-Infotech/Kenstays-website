// Test script for TekTravels API integration
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: `test${Date.now()}@example.com`,
  password: 'password123',
  phoneNumber: '1234567890'
};

let authToken = null;

// Helper function to make API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
  try {
    const config = {
      method,
      url: `${API_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` })
      },
      ...(data && { data })
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error.response?.data || error.message);
    throw error;
  }
};

// Test functions
const testRegistration = async () => {
  console.log('\n🧪 Testing User Registration...');
  console.log('Test User:', testUser);
  
  try {
    const response = await apiCall('/auth/register', 'POST', testUser);
    console.log('✅ Registration successful!');
    console.log('User:', response.user);
    console.log('TekTravels Auth:', response.tekTravels);
    authToken = response.token;
    return true;
  } catch (error) {
    console.error('❌ Registration failed');
    return false;
  }
};

const testLogin = async () => {
  console.log('\n🧪 Testing User Login...');
  
  try {
    const response = await apiCall('/auth/login', 'POST', {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful!');
    console.log('User:', response.user);
    console.log('TekTravels Auth:', response.tekTravels);
    authToken = response.token;
    return true;
  } catch (error) {
    console.error('❌ Login failed');
    return false;
  }
};

const testGetMe = async () => {
  console.log('\n🧪 Testing Get Current User...');
  
  try {
    const response = await apiCall('/auth/me', 'GET');
    console.log('✅ Get user successful!');
    console.log('User Data:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Get user failed');
    return false;
  }
};

const testLogout = async () => {
  console.log('\n🧪 Testing User Logout...');
  
  try {
    const response = await apiCall('/auth/logout', 'POST');
    console.log('✅ Logout successful!');
    console.log('Message:', response.message);
    authToken = null;
    return true;
  } catch (error) {
    console.error('❌ Logout failed');
    return false;
  }
};

// Run all tests
const runTests = async () => {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║   TekTravels API Integration Test Suite       ║');
  console.log('╚════════════════════════════════════════════════╝');
  
  try {
    // Test 1: Registration
    const registerSuccess = await testRegistration();
    if (!registerSuccess) {
      console.log('\n❌ Test suite failed at registration');
      return;
    }

    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test 2: Get current user
    const getMeSuccess = await testGetMe();
    if (!getMeSuccess) {
      console.log('\n❌ Test suite failed at get user');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test 3: Logout
    const logoutSuccess = await testLogout();
    if (!logoutSuccess) {
      console.log('\n❌ Test suite failed at logout');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test 4: Login again
    const loginSuccess = await testLogin();
    if (!loginSuccess) {
      console.log('\n❌ Test suite failed at login');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test 5: Logout again
    const logoutSuccess2 = await testLogout();
    if (!logoutSuccess2) {
      console.log('\n❌ Test suite failed at second logout');
      return;
    }

    console.log('\n╔════════════════════════════════════════════════╗');
    console.log('║   ✅ All tests passed successfully!           ║');
    console.log('╚════════════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('\n❌ Test suite failed with error:', error.message);
  }
};

// Check if server is running
const checkServer = async () => {
  try {
    await axios.get(`${API_URL}/health`);
    console.log('✅ Server is running on http://localhost:5000\n');
    return true;
  } catch (error) {
    console.error('❌ Server is not running. Please start the server first.');
    console.error('   Run: cd backend && npm run dev\n');
    return false;
  }
};

// Main execution
(async () => {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await runTests();
  }
  process.exit(0);
})();
