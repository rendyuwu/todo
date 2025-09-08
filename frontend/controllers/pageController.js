// Page controller to serve HTML views
const fs = require("fs").promises;
const path = require("path");

/**
 * Serve the main index page
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function serveIndexPage(req, res) {
  try {
    const indexPath = path.join(__dirname, "../views/index.html");
    const html = await fs.readFile(indexPath, "utf8");
    res.send(html);
  } catch (error) {
    console.error("Error serving index page:", error);
    res.status(500).json({
      success: false,
      error: "Failed to load page",
      message: "Could not load the requested page",
    });
  }
}

module.exports = {
  serveIndexPage,
};
