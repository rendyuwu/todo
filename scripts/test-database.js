#!/usr/bin/env node

// Database connection and migration test script
// This script verifies that the database connection works and migrations can be run

require("dotenv").config();
const knex = require("knex");

async function testDatabaseConnection() {
  console.log("Testing database connection...");

  try {
    // Determine environment
    const environment = process.env.NODE_ENV || "development";
    console.log(`Environment: ${environment}`);

    // Get database configuration based on environment
    const knexConfig = require("../knexfile")[environment];

    // Create knex instance
    const db = knex(knexConfig);

    // Test connection
    await db.raw("SELECT 1+1 as result");
    console.log("✓ Database connection successful");

    // Test if todos table exists
    try {
      const tables = await db.schema.hasTable("todos");
      if (tables) {
        console.log("✓ Todos table exists");

        // Get table info
        const columns = await db.raw(
          `
          SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'todos' AND TABLE_SCHEMA = ?
          ORDER BY ORDINAL_POSITION
        `,
          [process.env.DB_NAME || knexConfig.connection.database]
        );

        console.log("Todos table structure:");
        columns[0].forEach((column) => {
          console.log(
            `  - ${column.COLUMN_NAME} (${column.DATA_TYPE}) ${
              column.IS_NULLABLE === "YES" ? "NULL" : "NOT NULL"
            } ${
              column.COLUMN_DEFAULT ? `DEFAULT ${column.COLUMN_DEFAULT}` : ""
            }`
          );
        });
      } else {
        console.log("⚠ Todos table does not exist");
      }
    } catch (error) {
      console.log("⚠ Could not check table existence:", error.message);
    }

    // Close connection
    await db.destroy();
    console.log("✓ Database connection closed");
  } catch (error) {
    console.error("✗ Database connection failed:", error.message);
    process.exit(1);
  }
}

async function testMigrationStatus() {
  console.log("\nChecking migration status...");

  try {
    // Determine environment
    const environment = process.env.NODE_ENV || "development";

    // Get database configuration based on environment
    const knexConfig = require("../knexfile")[environment];

    // Create knex instance
    const db = knex(knexConfig);

    // Check migration status
    const migrations = await db.migrate.list();

    if (migrations[0].length === 0) {
      console.log("✓ No pending migrations");
    } else {
      console.log(`⚠ ${migrations[0].length} pending migrations:`);
      migrations[0].forEach((migration) => {
        console.log(`  - ${migration}`);
      });
    }

    if (migrations[1].length > 0) {
      console.log(`✓ ${migrations[1].length} completed migrations:`);
      migrations[1].forEach((migration) => {
        console.log(`  - ${migration}`);
      });
    }

    // Close connection
    await db.destroy();
    console.log("✓ Migration status check completed");
  } catch (error) {
    console.error("✗ Migration status check failed:", error.message);
    process.exit(1);
  }
}

async function runTests() {
  console.log("=== Database Test Script ===\n");

  await testDatabaseConnection();
  await testMigrationStatus();

  console.log("\n=== All tests completed successfully ===");
  console.log("\nTo run migrations if needed:");
  console.log("  npm run migrate");
}

// Run tests
runTests().catch((error) => {
  console.error("Test script failed:", error);
  process.exit(1);
});
