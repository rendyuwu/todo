// Todo routes
const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
} = require("../controllers/todoController");

// Import validation middleware
const {
  validateTodoCreation,
  validateTodoUpdate,
  validateTodoStatusUpdate,
  validateIdParam,
} = require("../middleware/validation");

// GET /api/todos - Get all todos
router.get("/", getAllTodos);

// POST /api/todos - Create a new todo
router.post("/", validateTodoCreation, createTodo);

// GET /api/todos/:id - Get a specific todo
router.get("/:id", validateIdParam, getTodoById);

// PUT /api/todos/:id - Update a todo
router.put("/:id", validateIdParam, validateTodoUpdate, updateTodo);

// PATCH /api/todos/:id/status - Update todo status
router.patch(
  "/:id/status",
  validateIdParam,
  validateTodoStatusUpdate,
  updateTodoStatus
);

// DELETE /api/todos/:id - Delete a todo
router.delete("/:id", validateIdParam, deleteTodo);

module.exports = router;
