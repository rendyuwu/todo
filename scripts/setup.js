#!/usr/bin/env node

// Setup script for the Modern TODO Application
// This script helps with initial setup and configuration

const fs = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

async function checkPrerequisites() {
  console.log("Checking prerequisites...\n");

  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.split(".")[0].replace("v", ""));

  if (majorVersion < 14) {
    console.warn("⚠ Warning: Node.js version 14 or higher is recommended");
    console.warn(`  Current version: ${nodeVersion}\n`);
  } else {
    console.log("✓ Node.js version is sufficient");
    console.log(`  Version: ${nodeVersion}\n`);
  }

  // Check if npm is available
  try {
    await execAsync("npm --version");
    console.log("✓ npm is available\n");
  } catch (error) {
    console.error("✗ npm is not available. Please install Node.js with npm.");
    process.exit(1);
  }
}

async function copyEnvFile() {
  console.log("Setting up environment configuration...\n");

  const envExamplePath = path.join(__dirname, "..", ".env.example");
  const envPath = path.join(__dirname, "..", ".env");

  try {
    // Check if .env file already exists
    try {
      await fs.access(envPath);
      console.log("✓ Environment file (.env) already exists\n");
      return;
    } catch (error) {
      // File doesn't exist, continue with copying
    }

    // Copy .env.example to .env
    await fs.copyFile(envExamplePath, envPath);
    console.log("✓ Environment file (.env) created from example\n");

    console.log("Please edit the .env file with your database credentials:");
    console.log("  nano .env  # or use your preferred text editor\n");
  } catch (error) {
    console.error("✗ Failed to set up environment file:", error.message);
    console.log(
      "\nPlease manually copy .env.example to .env and configure it.\n"
    );
  }
}

async function installDependencies() {
  console.log("Installing dependencies...\n");

  try {
    console.log("Running: npm install\n");
    const { stdout, stderr } = await execAsync("npm install", {
      cwd: path.join(__dirname, ".."),
    });

    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);

    console.log("✓ Dependencies installed successfully\n");
  } catch (error) {
    console.error("✗ Failed to install dependencies:", error.message);
    console.log('\nPlease run "npm install" manually.\n');
  }
}

async function setupDatabase() {
  console.log("Setting up database...\n");

  console.log(
    "Please ensure you have created a MySQL database for the application."
  );
  console.log("Example SQL command:");
  console.log("  CREATE DATABASE todo_app_dev;");
  console.log(
    "  CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'password';"
  );
  console.log(
    "  GRANT ALL PRIVILEGES ON todo_app_dev.* TO 'todo_user'@'localhost';\n"
  );

  console.log("After creating the database, run migrations with:");
  console.log("  npm run migrate\n");
}

async function showNextSteps() {
  console.log("=== Setup Complete! ===\n");

  console.log("Next steps:");
  console.log("1. Edit the .env file with your database credentials");
  console.log("2. Create your MySQL database (if not already done)");
  console.log("3. Run database migrations: npm run migrate");
  console.log("4. Start the development server: npm run dev");
  console.log("5. Visit http://localhost:3000 in your browser\n");

  console.log("Useful commands:");
  console.log("  npm run dev        # Start development server");
  console.log("  npm start          # Start production server");
  console.log("  npm run migrate    # Run database migrations");
  console.log("  npm test           # Run tests");
  console.log("  npm run migrate:rollback  # Rollback last migration\n");

  console.log("For more information, see the README.md file.");
}

async function runSetup() {
  console.log("=== Modern TODO Application Setup ===\n");

  await checkPrerequisites();
  await copyEnvFile();
  await installDependencies();
  await setupDatabase();
  await showNextSteps();

  console.log("=== Setup script finished ===");
}

// Run setup
runSetup().catch((error) => {
  console.error("Setup failed:", error);
  process.exit(1);
});
