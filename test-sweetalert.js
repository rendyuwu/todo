// Test script to verify SweetAlert2 implementation
console.log("Testing SweetAlert2 implementation...");

// Test 1: Check if SweetAlert2 is loaded
console.log("\n1. Testing SweetAlert2 availability...");

if (typeof Swal !== "undefined") {
  console.log("✅ SweetAlert2 is available");

  // Test 2: Try to show a simple alert
  console.log("\n2. Testing basic SweetAlert2 functionality...");

  try {
    // Test basic alert
    Swal.fire({
      title: "Test Alert",
      text: "SweetAlert2 is working correctly!",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    }).then(() => {
      console.log("✅ Basic SweetAlert2 alert displayed successfully");
    });

    // Test confirm dialog
    console.log("\n3. Testing confirm dialog...");
    Swal.fire({
      title: "Test Confirm",
      text: "This is a test confirm dialog",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      timer: 1500,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("✅ Confirm dialog - Confirmed");
      } else if (result.isDismissed) {
        console.log("✅ Confirm dialog - Dismissed");
      }
    });
  } catch (error) {
    console.log("❌ Error testing SweetAlert2 functionality:", error.message);
  }
} else {
  console.log("❌ SweetAlert2 is not available");
  console.log("   Please check the CDN link in index.html");
}

// Test 3: Check if the delete confirmation function works
console.log("\n4. Testing delete confirmation function...");

// Mock the deleteTodo function for testing
window.deleteTodo = function (id) {
  console.log(`✅ Delete function called with ID: ${id}`);
};

// Test the confirmDeleteTodo function
if (typeof window.confirmDeleteTodo === "function") {
  console.log("✅ confirmDeleteTodo function is available");
  console.log("   Note: Actual confirmation dialog requires user interaction");
} else {
  console.log("❌ confirmDeleteTodo function is not available");
}

console.log("\n🎉 SweetAlert2 test completed!");
console.log("\nTo manually verify the implementation:");
console.log("1. Start the application: npm run dev");
console.log("2. Open http://localhost:3000 in your browser");
console.log("3. Create a new todo item");
console.log("4. Click the Delete button for that item");
console.log("5. Verify that a SweetAlert2 confirmation dialog appears");
console.log("6. Confirm the deletion and verify the item is removed");
