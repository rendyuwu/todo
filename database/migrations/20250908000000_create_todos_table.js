/**
 * Create todos table migration
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("todos", function (table) {
    table.increments("id").primary();
    table.string("title", 255).notNullable();
    table.text("description");
    table
      .enu("status", ["pending", "in_progress", "completed"])
      .defaultTo("pending");
    table.timestamps(true, true); // Creates created_at and updated_at columns
  });
};

/**
 * Drop todos table migration
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("todos");
};
