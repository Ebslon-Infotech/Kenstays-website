// Direct test of TekTravels authentication service
require('dotenv').config();
const tekTravelsService = require('./services/tekTravelsService');

const testTekTravelsAuth = async () => {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║   TekTravels Direct Authentication Test       ║');
  console.log('╚════════════════════════════════════════════════╝\n');
  
  console.log('Configuration:');
  console.log('- API URL:', process.env.TEKTRAVELS_API_BASE_URL);
  console.log('- Client ID:', process.env.TEKTRAVELS_CLIENT_ID);
  console.log('- Username:', process.env.TEKTRAVELS_USERNAME);
  console.log('- End User IP:', process.env.TEKTRAVELS_END_USER_IP);
  console.log('');

  try {
    console.log('🔄 Attempting to authenticate with TekTravels API...\n');
    
    const result = await tekTravelsService.authenticate();
    
    console.log('✅ Authentication successful!');
    console.log('\nResponse:');
    console.log('- Token ID:', result.TokenId);
    console.log('- Status:', result.Status);
    console.log('- Expires At:', result.expiresAt);
    console.log('- Cached:', result.cached || false);
    
    if (result.Member) {
      console.log('\nMember Info:');
      console.log('- Member ID:', result.Member.MemberId);
      console.log('- Name:', result.Member.FirstName, result.Member.LastName);
    }
    
    if (result.Agency) {
      console.log('\nAgency Info:');
      console.log('- Agency ID:', result.Agency.AgencyId);
      console.log('- Name:', result.Agency.AgencyName);
    }
    
    console.log('\n╔════════════════════════════════════════════════╗');
    console.log('║   ✅ TekTravels integration is working!       ║');
    console.log('╚════════════════════════════════════════════════╝\n');
    
    // Test getting cached token
    console.log('🔄 Testing cached token...');
    const cachedToken = tekTravelsService.getCachedToken();
    if (cachedToken) {
      console.log('✅ Cached token retrieved:', cachedToken);
    } else {
      console.log('⚠️  No cached token found');
    }
    
  } catch (error) {
    console.error('\n❌ Authentication failed!');
    console.error('Error:', error.message);
    console.error('\nPossible reasons:');
    console.error('1. Invalid credentials in .env file');
    console.error('2. Network connectivity issues');
    console.error('3. TekTravels API is down or endpoint changed');
    console.error('4. IP not whitelisted for production environment');
    console.error('\n⚠️  Using test credentials - this is normal for development');
    console.error('   Contact TekTravels for valid test credentials');
  }
};

testTekTravelsAuth();
