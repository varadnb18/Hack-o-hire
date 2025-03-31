const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';

async function sendRequest() {
  const randomValue = Math.random() * 100; // Generate a number between 0-100

  let url = '/';
  let expectedStatus = 200;

  if (randomValue > 30 && randomValue <= 95) {
    // Simulate a 4xx error (client error)
    url = '/invalid-route'; // Non-existing route to trigger 404
    expectedStatus = 404;
  } else if (randomValue > 95) {
    // Simulate a 5xx error (server error)
    url = '/fail';
    expectedStatus = 500;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}${url}`);
    console.log(`✅ Success: ${url} → Status ${response.status}`);
  } catch (error) {
    console.log(
      `❌ Error: ${url} → Expected: ${expectedStatus}, Got: ${error.response?.status || 'Unknown'}`
    );
  }
}

// Simulate multiple requests
async function simulateTraffic(requestCount = 100) {
  for (let i = 0; i < requestCount; i++) {
    await sendRequest();
    await new Promise((resolve) => setTimeout(resolve, 200)); // Small delay to mimic real traffic
  }
}

simulateTraffic();
