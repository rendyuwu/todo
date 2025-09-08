// Database configuration and connection
require("dotenv").config();
const knex = require("knex");

// Determine environment
const environment = process.env.NODE_ENV || "development";

// Get database configuration based on environment
const knexConfig = require("../../knexfile")[environment];

// Create knex instance
const db = knex(knexConfig);

module.exports = db;
