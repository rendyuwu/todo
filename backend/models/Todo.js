// Todo model for interacting with the todos table
const db = require("../config/database");

class Todo {
  /**
   * Get all todos
   * @returns {Promise<Array>}
   */
  static async getAll() {
    return await db("todos").select("*").orderBy("created_at", "desc");
  }

  /**
   * Get todo by ID
   * @param {number} id - Todo ID
   * @returns {Promise<Object|null>}
   */
  static async getById(id) {
    const todo = await db("todos").where("id", id).first();
    return todo || null;
  }

  /**
   * Create a new todo
   * @param {Object} todoData - Todo data
   * @returns {Promise<Object>}
   */
  static async create(todoData) {
    const [id] = await db("todos").insert({
      title: todoData.title,
      description: todoData.description,
      status: todoData.status || "pending",
      priority: todoData.priority || "medium",
    });

    return await this.getById(id);
  }

  /**
   * Update a todo
   * @param {number} id - Todo ID
   * @param {Object} todoData - Todo data to update
   * @returns {Promise<Object|null>}
   */
  static async update(id, todoData) {
    const existingTodo = await this.getById(id);
    if (!existingTodo) {
      return null;
    }

    await db("todos").where("id", id).update({
      title: todoData.title,
      description: todoData.description,
      status: todoData.status,
      priority: todoData.priority,
      updated_at: db.fn.now(),
    });

    return await this.getById(id);
  }

  /**
   * Update todo status
   * @param {number} id - Todo ID
   * @param {string} status - New status
   * @returns {Promise<Object|null>}
   */
  static async updateStatus(id, status) {
    const existingTodo = await this.getById(id);
    if (!existingTodo) {
      return null;
    }

    await db("todos").where("id", id).update({
      status: status,
      updated_at: db.fn.now(),
    });

    return await this.getById(id);
  }

  /**
   * Delete a todo
   * @param {number} id - Todo ID
   * @returns {Promise<boolean>}
   */
  static async delete(id) {
    const existingTodo = await this.getById(id);
    if (!existingTodo) {
      return false;
    }

    await db("todos").where("id", id).del();
    return true;
  }
}

module.exports = Todo;
