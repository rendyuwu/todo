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
const { serveIndexPage } = require("./backend/controllers/pageController");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("combined")); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use("/api/todos", todoRoutes);

// Serve static files from React build directory first (for production)
app.use(express.static(path.join(__dirname, "build"), { maxAge: "1d" }));

// Serve static files from public (for development)
app.use(express.static(path.join(__dirname, "public")));

// API Info endpoint - only respond with JSON for API clients
app.get(
  "/",
  (req, res, next) => {
    // Check if the client is requesting JSON
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("application/json")) {
      res.status(200).json({
        success: true,
        message: "Welcome to the Modern TODO API",
        version: "1.0.0",
        endpoints: {
          todos: "/api/todos",
          docs: "/api/docs",
        },
      });
    } else {
      // For browser requests, serve the React app
      next();
    }
  },
  serveIndexPage
);

// Serve the main page for all other routes (React Router)
app.get("*", serveIndexPage);

// Error handling middleware
app.use(notFoundHandler); // 404 handler
app.use(errorHandler); // Global error handler

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
