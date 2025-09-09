import React, { useState, useEffect } from "react";
import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import EditTodoModal from "./components/EditTodoModal";
import ToastNotification from "./components/ToastNotification";
import { getAllTodos } from "./services/todoService";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentPriorityFilter, setCurrentPriorityFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Load todos from API
  const loadTodos = async () => {
    try {
      setLoading(true);
      const result = await getAllTodos();
      if (result.success) {
        setTodos(result.data);
      } else {
        setError(result.message);
        showToast(result.message, "error");
      }
    } catch (err) {
      setError(err.message);
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Show toast notification
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (filterType === "status") {
      setCurrentFilter(value);
    } else if (filterType === "priority") {
      setCurrentPriorityFilter(value);
    }
  };

  // Filter todos based on current filters
  const getFilteredTodos = () => {
    let filteredTodos = todos;

    // Apply status filter
    if (currentFilter !== "all") {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.status === currentFilter
      );
    }

    // Apply priority filter
    if (currentPriorityFilter !== "all") {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.priority === currentPriorityFilter
      );
    }

    return filteredTodos;
  };

  // Open edit modal
  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setShowEditModal(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Modern TODO App
          </h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </header>

        <main>
          {/* Add Todo Form */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add New Task
              </h2>
              <AddTodoForm onTodoAdded={loadTodos} showToast={showToast} />
            </div>
          </section>

          {/* Todo List */}
          <section>
            <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Your Tasks
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={loadTodos}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-300"
                  >
                    <i className="fas fa-sync-alt mr-2"></i>Refresh
                  </button>
                </div>
              </div>

              {/* Filter Buttons */}
              <FilterButtons
                currentFilter={currentFilter}
                currentPriorityFilter={currentPriorityFilter}
                onFilterChange={handleFilterChange}
              />

              {/* Todo Items Container */}
              <div id="todoList" className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">
                    <i className="fas fa-spinner fa-spin text-2xl mb-2"></i>
                    <p>Loading tasks...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-500">
                    <i className="fas fa-exclamation-triangle text-2xl mb-2"></i>
                    <p>{error}</p>
                    <button
                      onClick={loadTodos}
                      className="try-again-btn mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition duration-300"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <TodoList
                    todos={getFilteredTodos()}
                    onEdit={openEditModal}
                    onDelete={(id) => {
                      // Handle delete with SweetAlert2 confirmation
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "Cancel",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          // Delete todo and reload list
                          // Implementation will be added in TodoList component
                        }
                      });
                    }}
                    onComplete={(id) => {
                      // Handle complete action
                      // Implementation will be added in TodoList component
                    }}
                    onTodoUpdated={loadTodos}
                    showToast={showToast}
                  />
                )}
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-16 text-center text-gray-600">
          <p>© 2025 Modern TODO App. All rights reserved.</p>
        </footer>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditTodoModal
          todo={editingTodo}
          onClose={closeEditModal}
          onTodoUpdated={() => {
            closeEditModal();
            loadTodos();
            showToast("Task updated successfully!", "success");
          }}
          showToast={showToast}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
