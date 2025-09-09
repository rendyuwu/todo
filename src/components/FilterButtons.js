import React from "react";

const FilterButtons = ({
  currentFilter,
  currentPriorityFilter,
  onFilterChange,
}) => {
  return (
    <>
      {/* Status Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`filter-btn px-4 py-2 rounded-full text-sm font-medium ${
            currentFilter === "all"
              ? "bg-blue-100 text-blue-800 ring-2 ring-offset-2"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => onFilterChange("status", "all")}
        >
          All
        </button>
        <button
          className={`filter-btn px-4 py-2 rounded-full text-sm font-medium ${
            currentFilter === "pending"
              ? "bg-yellow-100 text-yellow-800 ring-2 ring-offset-2"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => onFilterChange("status", "pending")}
        >
          Pending
        </button>
        <button
          className={`filter-btn px-4 py-2 rounded-full text-sm font-medium ${
            currentFilter === "in_progress"
              ? "bg-orange-100 text-orange-800 ring-2 ring-offset-2"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => onFilterChange("status", "in_progress")}
        >
          In Progress
        </button>
        <button
          className={`filter-btn px-4 py-2 rounded-full text-sm font-medium ${
            currentFilter === "completed"
              ? "bg-green-100 text-green-800 ring-2 ring-offset-2"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => onFilterChange("status", "completed")}
        >
          Completed
        </button>
      </div>

      {/* Priority Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm font-medium text-gray-700 self-center">
          Priority:
        </span>
        <button
          className={`priority-filter-btn px-4 py-2 rounded-full text-sm font-medium ${
            currentPriorityFilter === "all"
              ? "bg-gray-100 text-gray-800 ring-2 ring-offset-2"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => onFilterChange("priority", "all")}
        >
          All
        </button>
        <button
          className={`priority-filter-btn px-4 py-2 rounded-full text-sm font-medium ${
            currentPriorityFilter === "high"
              ? "bg-red-100 text-red-800 ring-2 ring-offset-2"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => onFilterChange("priority", "high")}
        >
          High
        </button>
        <button
          className={`priority-filter-btn px-4 py-2 rounded-full text-sm font-medium ${
            currentPriorityFilter === "medium"
              ? "bg-yellow-100 text-yellow-800 ring-2 ring-offset-2"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => onFilterChange("priority", "medium")}
        >
          Medium
        </button>
        <button
          className={`priority-filter-btn px-4 py-2 rounded-full text-sm font-medium ${
            currentPriorityFilter === "low"
              ? "bg-green-100 text-green-800 ring-2 ring-offset-2"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => onFilterChange("priority", "low")}
        >
          Low
        </button>
      </div>
    </>
  );
};

export default FilterButtons;
