// Simple test script to verify the application works
const http = require("http");

console.log("Testing Modern TODO App...");

// Test 1: Check if server is running
console.log("\n1. Testing server connectivity...");

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "GET",
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);

  if (res.statusCode === 200) {
    console.log("✅ Server is running and responding");
  } else {
    console.log("❌ Server returned unexpected status code");
  }

  res.on("data", (chunk) => {
    // Check if response contains expected content
    const response = chunk.toString();
    if (response.includes("Modern TODO App")) {
      console.log("✅ HTML content is correct");
    } else {
      console.log("❌ HTML content is incorrect");
    }
  });
});

req.on("error", (error) => {
  console.log("❌ Server is not running or not accessible");
  console.log("   Please start the server with: npm run dev");
  console.log("   Error:", error.message);
});

req.end();

// Test 2: Check if API is accessible
console.log("\n2. Testing API connectivity...");

const apiOptions = {
  hostname: "localhost",
  port: 3000,
  path: "/api/todos",
  method: "GET",
};

const apiReq = http.request(apiOptions, (res) => {
  console.log(`API Status Code: ${res.statusCode}`);

  if (res.statusCode === 200) {
    console.log("✅ API is accessible");
  } else {
    console.log("❌ API returned unexpected status code");
  }

  res.on("data", (chunk) => {
    try {
      const jsonResponse = JSON.parse(chunk.toString());
      if (
        jsonResponse.hasOwnProperty("success") &&
        Array.isArray(jsonResponse.data)
      ) {
        console.log("✅ API response format is correct");
      } else {
        console.log("❌ API response format is incorrect");
      }
    } catch (e) {
      console.log("❌ API response is not valid JSON");
    }
  });
});

apiReq.on("error", (error) => {
  console.log("❌ API is not accessible");
  console.log("   Error:", error.message);
});

apiReq.end();

console.log("\n🎉 Test completed!");
console.log("\nTo run the application:");
console.log("1. Make sure MySQL is running");
console.log('2. Create a database named "todo_app_dev"');
console.log("3. Update .env with your database credentials");
console.log("4. Run: npm run migrate");
console.log("5. Run: npm run dev");
console.log("6. Open http://localhost:3000 in your browser");
