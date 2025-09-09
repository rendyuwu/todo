import axios from "axios";

const API_BASE_URL = "/api/todos";

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Get all todos
 * @returns {Promise<Array>}
 */
export async function getAllTodos() {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch todos");
  }
}

/**
 * Get todo by ID
 * @param {number} id - Todo ID
 * @returns {Promise<Object>}
 */
export async function getTodoById(id) {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch todo");
  }
}

/**
 * Create a new todo
 * @param {Object} todoData - Todo data
 * @returns {Promise<Object>}
 */
export async function createTodo(todoData) {
  try {
    const response = await apiClient.post("/", todoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create todo");
  }
}

/**
 * Update a todo
 * @param {number} id - Todo ID
 * @param {Object} todoData - Todo data to update
 * @returns {Promise<Object>}
 */
export async function updateTodo(id, todoData) {
  try {
    const response = await apiClient.put(`/${id}`, todoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update todo");
  }
}

/**
 * Update todo status
 * @param {number} id - Todo ID
 * @param {string} status - New status
 * @returns {Promise<Object>}
 */
export async function updateTodoStatus(id, status) {
  try {
    const response = await apiClient.patch(`/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update todo status"
    );
  }
}

/**
 * Delete a todo
 * @param {number} id - Todo ID
 * @returns {Promise<Object>}
 */
export async function deleteTodo(id) {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete todo");
  }
}

export default {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
};
