// Modern TODO App Frontend JavaScript

// Check if Tailwind CSS is available
function isTailwindAvailable() {
  // Create a test element
  const testElement = document.createElement("div");
  testElement.className = "flex hidden";

  // Add to DOM temporarily
  document.body.appendChild(testElement);

  // Check if the classes are applied
  const computedStyle = window.getComputedStyle(testElement);
  const isFlex = computedStyle.display === "flex";
  const isHidden = testElement.offsetParent === null;

  // Remove test element
  document.body.removeChild(testElement);

  return isFlex && isHidden;
}

// Add class to body based on Tailwind availability
document.addEventListener("DOMContentLoaded", function () {
  if (isTailwindAvailable()) {
    document.body.classList.add("tailwind-available");
  } else {
    document.body.classList.add("no-tailwind");
    console.warn("Tailwind CSS not available, using fallback styles");
  }

  // Initialize the app
  initializeApp();
});

// API Base URL
const API_BASE_URL = "/api/todos";

// DOM Elements
let todoForm, todoList, refreshBtn, editModal, editForm, cancelEdit;

// State
let currentFilter = "all";
let currentPriorityFilter = "all";

// Initialize the app
function initializeApp() {
  // Get DOM elements
  todoForm = document.getElementById("todoForm");
  todoList = document.getElementById("todoList");
  refreshBtn = document.getElementById("refreshBtn");
  editModal = document.getElementById("editModal");
  editForm = document.getElementById("editForm");
  cancelEdit = document.getElementById("cancelEdit");

  // Load todos
  loadTodos();

  // Event Listeners
  if (todoForm) todoForm.addEventListener("submit", handleCreateTodo);
  if (refreshBtn) refreshBtn.addEventListener("click", loadTodos);
  if (cancelEdit) cancelEdit.addEventListener("click", closeEditModal);
  if (editForm) editForm.addEventListener("submit", handleUpdateTodo);

  // Todo list event delegation for buttons
  if (todoList) {
    todoList.addEventListener("click", function (event) {
      const target = event.target;

      // Handle edit button clicks
      if (target.closest(".edit-btn")) {
        const todoId = target.closest(".edit-btn").dataset.id;
        openEditModal(todoId);
      }

      // Handle delete button clicks
      if (target.closest(".delete-btn")) {
        const todoId = target.closest(".delete-btn").dataset.id;
        confirmDeleteTodo(todoId);
      }

      // Handle done button clicks
      if (target.closest(".done-btn")) {
        const todoId = target.closest(".done-btn").dataset.id;
        updateStatus(todoId, "completed");
      }

      // Handle try again button clicks in error messages
      if (target.closest(".try-again-btn")) {
        loadTodos();
      }
    });
  }

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("ring-2", "ring-offset-2"));
      this.classList.add("ring-2", "ring-offset-2");
      currentFilter = this.dataset.filter;
      loadTodos();
    });
  });

  // Priority filter buttons
  document.querySelectorAll(".priority-filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".priority-filter-btn")
        .forEach((b) => b.classList.remove("ring-2", "ring-offset-2"));
      this.classList.add("ring-2", "ring-offset-2");
      currentPriorityFilter = this.dataset.priority;
      loadTodos();
    });
  });
}

// Load todos from API
async function loadTodos() {
  try {
    showLoading();

    const response = await fetch(API_BASE_URL);
    const result = await response.json();

    if (result.success) {
      renderTodos(result.data);
    } else {
      showError("Failed to load todos: " + result.message);
    }
  } catch (error) {
    console.error("Error loading todos:", error);
    showError("Failed to load todos. Please try again.");
  }
}

// Render todos to the UI
function renderTodos(todos) {
  // Apply status filter
  let filteredTodos =
    currentFilter === "all"
      ? todos
      : todos.filter((todo) => todo.status === currentFilter);

  // Apply priority filter
  if (currentPriorityFilter !== "all") {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.priority === currentPriorityFilter
    );
  }

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-tasks text-4xl mb-2"></i>
                <p>No tasks found${
                  currentFilter !== "all"
                    ? ` with status "${currentFilter}"`
                    : ""
                }${
      currentPriorityFilter !== "all"
        ? ` and priority "${currentPriorityFilter}"`
        : ""
    }.</p>
                <p class="mt-2">Add a new task or try a different filter.</p>
            </div>
        `;
    return;
  }

  todoList.innerHTML = filteredTodos
    .map(
      (todo) => `
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 todo-item" data-id="${
          todo.id
        }">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center">
                        <h3 class="font-semibold text-lg ${getStatusClass(
                          todo.status
                        )}">${escapeHtml(todo.title)}</h3>
                        <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(
                          todo.priority
                        )}">
                            ${getPriorityText(todo.priority)}
                        </span>
                    </div>
                    ${
                      todo.description
                        ? `<p class="text-gray-600 mt-2">${escapeHtml(
                            todo.description
                          )}</p>`
                        : ""
                    }
                    <div class="flex flex-wrap items-center mt-3 text-sm text-gray-500 gap-3">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                          todo.status
                        )}">
                            ${getStatusText(todo.status)}
                        </span>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(
                          todo.priority
                        )}">
                            <i class="fas fa-${getPriorityIcon(
                              todo.priority
                            )} mr-1"></i>
                            ${getPriorityText(todo.priority)}
                        </span>
                        <span>
                            <i class="far fa-calendar-plus mr-1"></i>
                            Created: ${formatDate(todo.created_at)}
                        </span>
                        ${
                          todo.updated_at !== todo.created_at
                            ? `
                        <span>
                            <i class="far fa-edit mr-1"></i>
                            Updated: ${formatDate(todo.updated_at)}
                        </span>
                        `
                            : ""
                        }
                    </div>
                </div>
                <div class="flex space-x-2 ml-4">
                    <button data-id="${todo.id}" 
                            class="edit-btn p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition duration-300"
                            title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button data-id="${todo.id}" 
                            class="delete-btn p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition duration-300"
                            title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                    ${
                      todo.status !== "completed"
                        ? `
                    <button data-id="${todo.id}" 
                            class="done-btn p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition duration-300"
                            title="Mark as completed">
                        <i class="fas fa-check"></i>
                    </button>
                    `
                        : ""
                    }
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Show loading state
function showLoading() {
  todoList.innerHTML = `
        <div class="text-center py-8 text-gray-500">
            <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
            <p>Loading tasks...</p>
        </div>
    `;
}

// Show error message
function showError(message) {
  todoList.innerHTML = `
        <div class="text-center py-8 text-red-500">
            <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
            <p>${escapeHtml(message)}</p>
            <button class="try-again-btn mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition duration-300">
                Try Again
            </button>
        </div>
    `;
}

// Handle create todo form submission
async function handleCreateTodo(e) {
  e.preventDefault();

  const formData = new FormData(todoForm);
  const todoData = {
    title: formData.get("title").trim(),
    description: formData.get("description").trim() || null,
    status: formData.get("status"),
    priority: formData.get("priority"),
  };

  // Basic validation
  if (!todoData.title) {
    alert("Please enter a title for the task.");
    return;
  }

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    const result = await response.json();

    if (result.success) {
      todoForm.reset();
      // Reset priority to default
      document.getElementById("priority").value = "medium";
      loadTodos();
      showMessage("Task added successfully!", "success");
    } else {
      showMessage("Failed to add task: " + result.message, "error");
    }
  } catch (error) {
    console.error("Error creating todo:", error);
    showMessage("Failed to add task. Please try again.", "error");
  }
}

// Open edit modal with todo data
async function openEditModal(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const result = await response.json();

    if (result.success) {
      const todo = result.data;
      document.getElementById("editId").value = todo.id;
      document.getElementById("editTitle").value = todo.title;
      document.getElementById("editDescription").value = todo.description || "";
      document.getElementById("editStatus").value = todo.status;
      document.getElementById("editPriority").value = todo.priority;

      editModal.classList.remove("hidden");
      editModal.classList.add("flex");
    } else {
      showMessage("Failed to load task: " + result.message, "error");
    }
  } catch (error) {
    console.error("Error loading todo for edit:", error);
    showMessage("Failed to load task. Please try again.", "error");
  }
}

// Close edit modal
function closeEditModal() {
  editModal.classList.add("hidden");
  editModal.classList.remove("flex");
  editForm.reset();
}

// Handle update todo form submission
async function handleUpdateTodo(e) {
  e.preventDefault();

  const id = document.getElementById("editId").value;
  const formData = new FormData(editForm);
  const todoData = {
    title: formData.get("title").trim(),
    description: formData.get("description").trim() || null,
    status: formData.get("status"),
    priority: formData.get("priority"),
  };

  // Basic validation
  if (!todoData.title) {
    alert("Please enter a title for the task.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    const result = await response.json();

    if (result.success) {
      closeEditModal();
      loadTodos();
      showMessage("Task updated successfully!", "success");
    } else {
      showMessage("Failed to update task: " + result.message, "error");
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    showMessage("Failed to update task. Please try again.", "error");
  }
}

// Update todo status
async function updateStatus(id, status) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();

    if (result.success) {
      loadTodos();
      showMessage("Task status updated!", "success");
    } else {
      showMessage("Failed to update task status: " + result.message, "error");
    }
  } catch (error) {
    console.error("Error updating todo status:", error);
    showMessage("Failed to update task status. Please try again.", "error");
  }
}

// Confirm delete todo with SweetAlert2
async function confirmDeleteTodo(id) {
  // Check if SweetAlert2 is available
  if (typeof Swal !== "undefined") {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      deleteTodo(id);
    }
  } else {
    // Fallback to basic confirm if SweetAlert2 is not available
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTodo(id);
    }
  }
}

// Delete todo
async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      loadTodos();
      // Show success message with SweetAlert2 if available
      if (typeof Swal !== "undefined") {
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        showMessage("Task deleted successfully!", "success");
      }
    } else {
      showMessage("Failed to delete task: " + result.message, "error");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    showMessage("Failed to delete task. Please try again.", "error");
  }
}

// Show message to user
function showMessage(message, type) {
  // Remove any existing messages
  const existingMessage = document.querySelector(".toast-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageEl = document.createElement("div");
  messageEl.className = `toast-message fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white z-50 ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  messageEl.textContent = message;

  // Add to DOM
  document.body.appendChild(messageEl);

  // Remove after 3 seconds
  setTimeout(() => {
    messageEl.remove();
  }, 3000);
}

// Helper functions
function getStatusClass(status) {
  switch (status) {
    case "completed":
      return "text-green-600 line-through";
    case "in_progress":
      return "text-orange-600";
    default:
      return "text-gray-800";
  }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "in_progress":
      return "bg-orange-100 text-orange-800";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getPriorityBadgeClass(priority) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusText(status) {
  switch (status) {
    case "pending":
      return "Pending";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

function getPriorityText(priority) {
  switch (priority) {
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
    default:
      return priority;
  }
}

function getPriorityIcon(priority) {
  switch (priority) {
    case "high":
      return "arrow-up";
    case "medium":
      return "minus";
    case "low":
      return "arrow-down";
    default:
      return "circle";
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
}

function escapeHtml(text) {
  const map = {
    "&": "&",
    "<": "<",
    ">": ">",
    '"': '"',
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}
