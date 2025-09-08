// Global error handling middleware
function errorHandler(err, req, res, next) {
  // Log error for debugging in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      body: req.body,
      query: req.query,
    });
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      details: err.details || null,
    }),
  });
}

// 404 handler middleware
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
