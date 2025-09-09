import React from "react";
import { deleteTodo, updateTodoStatus } from "../services/todoService";
import Swal from "sweetalert2";

const TodoItem = ({
  todo,
  onEdit,
  onDelete,
  onComplete,
  onTodoUpdated,
  showToast,
}) => {
  // Helper functions for styling
  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 line-through";
      case "in_progress":
        return "text-orange-600";
      default:
        return "text-gray-800";
    }
  };

  const getStatusBadgeClass = (status) => {
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
  };

  const getPriorityBadgeClass = (priority) => {
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
  };

  const getStatusText = (status) => {
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
  };

  const getPriorityText = (priority) => {
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
  };

  const getPriorityIcon = (priority) => {
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
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    try {
      const result = await deleteTodo(id);
      if (result.success) {
        onTodoUpdated();
        // Show success message with SweetAlert2
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        showToast(result.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // Handle mark as completed
  const handleComplete = async (id) => {
    try {
      const result = await updateTodoStatus(id, "completed");
      if (result.success) {
        onTodoUpdated();
        showToast("Task status updated!", "success");
      } else {
        showToast(result.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 todo-item">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <h3
              className={`font-semibold text-lg ${getStatusClass(todo.status)}`}
            >
              {todo.title}
            </h3>
            <span
              className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(
                todo.priority
              )}`}
            >
              {getPriorityText(todo.priority)}
            </span>
          </div>
          {todo.description && (
            <p className="text-gray-600 mt-2">{todo.description}</p>
          )}
          <div className="flex flex-wrap items-center mt-3 text-sm text-gray-500 gap-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                todo.status
              )}`}
            >
              {getStatusText(todo.status)}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(
                todo.priority
              )}`}
            >
              <i
                className={`fas fa-${getPriorityIcon(todo.priority)} mr-1`}
              ></i>
              {getPriorityText(todo.priority)}
            </span>
            <span>
              <i className="far fa-calendar-plus mr-1"></i>
              Created: {formatDate(todo.created_at)}
            </span>
            {todo.updated_at !== todo.created_at && (
              <span>
                <i className="far fa-edit mr-1"></i>
                Updated: {formatDate(todo.updated_at)}
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(todo)}
            className="edit-btn p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition duration-300"
            title="Edit"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={() => {
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
                  handleDelete(todo.id);
                }
              });
            }}
            className="delete-btn p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition duration-300"
            title="Delete"
          >
            <i className="fas fa-trash"></i>
          </button>
          {todo.status !== "completed" && (
            <button
              onClick={() => handleComplete(todo.id)}
              className="done-btn p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition duration-300"
              title="Mark as completed"
            >
              <i className="fas fa-check"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
