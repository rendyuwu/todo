/**
 * Add priority column to todos table migration
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("todos", function (table) {
    table.enu("priority", ["low", "medium", "high"]).defaultTo("medium");
  });
};

/**
 * Remove priority column from todos table migration
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("todos", function (table) {
    table.dropColumn("priority");
  });
};
