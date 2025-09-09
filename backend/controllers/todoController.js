// Todo controller to handle HTTP requests
const Todo = require("../models/Todo");

/**
 * Get all todos
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getAllTodos(req, res) {
  try {
    const todos = await Todo.getAll();
    res.status(200).json({
      success: true,
      data: todos,
      count: todos.length,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch todos",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}

/**
 * Get todo by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getTodoById(req, res) {
  try {
    const { id } = req.params;

    // Validate ID is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ID",
        message: "ID must be a valid number",
      });
    }

    const todo = await Todo.getById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
        message: `Todo with ID ${id} does not exist`,
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch todo",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}

/**
 * Create a new todo
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function createTodo(req, res) {
  try {
    const { title, description, status } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        message: "Title is required",
      });
    }

    // Validate status if provided
    if (status && !["pending", "in_progress", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        message: "Status must be one of: pending, in_progress, completed",
      });
    }

    const todoData = {
      title: title.trim(),
      description: description ? description.trim() : null,
      status: status || "pending",
    };

    const newTodo = await Todo.create(todoData);

    res.status(201).json({
      success: true,
      data: newTodo,
      message: "Todo created successfully",
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create todo",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}

/**
 * Update a todo
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    // Validate ID is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ID",
        message: "ID must be a valid number",
      });
    }

    // Check if todo exists
    const existingTodo = await Todo.getById(id);
    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
        message: `Todo with ID ${id} does not exist`,
      });
    }

    // Validation
    if (title !== undefined && (!title || title.trim() === "")) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        message: "Title cannot be empty",
      });
    }

    // Validate status if provided
    if (status && !["pending", "in_progress", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        message: "Status must be one of: pending, in_progress, completed",
      });
    }

    // Validate priority if provided
    if (priority && !["low", "medium", "high"].includes(priority)) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        message: "Priority must be one of: low, medium, high",
      });
    }

    const todoData = {};
    if (title !== undefined) todoData.title = title.trim();
    if (description !== undefined)
      todoData.description = description ? description.trim() : null;
    if (status !== undefined) todoData.status = status;
    if (priority !== undefined) todoData.priority = priority;

    const updatedTodo = await Todo.update(id, todoData);

    res.status(200).json({
      success: true,
      data: updatedTodo,
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update todo",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}

/**
 * Update todo status
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function updateTodoStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate ID is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ID",
        message: "ID must be a valid number",
      });
    }

    // Check if todo exists
    const existingTodo = await Todo.getById(id);
    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
        message: `Todo with ID ${id} does not exist`,
      });
    }

    // Validate status
    if (!status || !["pending", "in_progress", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        message: "Status must be one of: pending, in_progress, completed",
      });
    }

    const updatedTodo = await Todo.updateStatus(id, status);

    res.status(200).json({
      success: true,
      data: updatedTodo,
      message: "Todo status updated successfully",
    });
  } catch (error) {
    console.error("Error updating todo status:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update todo status",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}

/**
 * Delete a todo
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function deleteTodo(req, res) {
  try {
    const { id } = req.params;

    // Validate ID is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ID",
        message: "ID must be a valid number",
      });
    }

    // Check if todo exists
    const existingTodo = await Todo.getById(id);
    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
        message: `Todo with ID ${id} does not exist`,
      });
    }

    const deleted = await Todo.delete(id);

    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to delete todo",
        message: "An error occurred while deleting the todo",
      });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete todo",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
};
