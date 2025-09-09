// Page controller to serve React app
const path = require("path");
const fs = require("fs").promises;

/**
 * Serve the main index page (React app)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function serveIndexPage(req, res) {
  try {
    // Try to serve the built React app first
    const buildIndexPath = path.join(__dirname, "../../build/index.html");
    const html = await fs.readFile(buildIndexPath, "utf8");
    res.send(html);
  } catch (error) {
    // Fallback to development mode - serve from public
    try {
      const publicIndexPath = path.join(__dirname, "../../public/index.html");
      const html = await fs.readFile(publicIndexPath, "utf8");
      res.send(html);
    } catch (fallbackError) {
      console.error("Error serving index page:", fallbackError);
      res.status(500).json({
        success: false,
        error: "Failed to load page",
        message: "Could not load the requested page",
      });
    }
  }
}

module.exports = {
  serveIndexPage,
};
