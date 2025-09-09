import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  onEdit,
  onDelete,
  onComplete,
  onTodoUpdated,
  showToast,
}) => {
  if (todos.length === 0) {
    // Get current filter status for message
    const currentFilter = localStorage.getItem("currentFilter") || "all";
    const currentPriorityFilter =
      localStorage.getItem("currentPriorityFilter") || "all";

    return (
      <div className="text-center py-8 text-gray-500">
        <i className="fas fa-tasks text-4xl mb-2"></i>
        <p>
          No tasks found
          {currentFilter !== "all" ? ` with status "${currentFilter}"` : ""}
          {currentPriorityFilter !== "all"
            ? ` and priority "${currentPriorityFilter}"`
            : ""}
          .
        </p>
        <p className="mt-2">Add a new task or try a different filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
          onTodoUpdated={onTodoUpdated}
          showToast={showToast}
        />
      ))}
    </div>
  );
};

export default TodoList;
