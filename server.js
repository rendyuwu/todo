// Load environment variables
require("dotenv").config();

// Import required modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

// Import routes
const todoRoutes = require("./backend/routes/todos");

// Import middleware
const {
  errorHandler,
  notFoundHandler,
} = require("./backend/middleware/errorHandler");

// Import frontend controller
const { serveIndexPage } = require("./frontend/controllers/pageController");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("combined")); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from frontend/public
app.use(express.static(path.join(__dirname, "frontend/public")));

// Routes
app.use("/api/todos", todoRoutes);

// Serve the main page
app.get("/", serveIndexPage);

// Error handling middleware
app.use(notFoundHandler); // 404 handler
app.use(errorHandler); // Global error handler

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
