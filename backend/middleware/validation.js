// Validation middleware for todo operations

/**
 * Validate todo creation data
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function validateTodoCreation(req, res, next) {
  const { title, description, status, priority } = req.body;
  const errors = [];

  // Title validation
  if (!title) {
    errors.push("Title is required");
  } else if (typeof title !== "string") {
    errors.push("Title must be a string");
  } else if (title.trim().length === 0) {
    errors.push("Title cannot be empty");
  } else if (title.length > 255) {
    errors.push("Title cannot exceed 255 characters");
  }

  // Description validation (optional)
  if (description !== undefined && description !== null) {
    if (typeof description !== "string") {
      errors.push("Description must be a string");
    }
  }

  // Status validation (optional)
  if (status !== undefined && status !== null) {
    if (typeof status !== "string") {
      errors.push("Status must be a string");
    } else if (!["pending", "in_progress", "completed"].includes(status)) {
      errors.push("Status must be one of: pending, in_progress, completed");
    }
  }

  // Priority validation (optional)
  if (priority !== undefined && priority !== null) {
    if (typeof priority !== "string") {
      errors.push("Priority must be a string");
    } else if (!["low", "medium", "high"].includes(priority)) {
      errors.push("Priority must be one of: low, medium, high");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: errors,
    });
  }

  next();
}

/**
 * Validate todo update data
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function validateTodoUpdate(req, res, next) {
  const { title, description, status, priority } = req.body;
  const errors = [];

  // Title validation (optional)
  if (title !== undefined) {
    if (title === null) {
      // Allow null to clear the field
    } else if (typeof title !== "string") {
      errors.push("Title must be a string");
    } else if (title.trim().length === 0) {
      errors.push("Title cannot be empty");
    } else if (title.length > 255) {
      errors.push("Title cannot exceed 255 characters");
    }
  }

  // Description validation (optional)
  if (description !== undefined) {
    if (description !== null && typeof description !== "string") {
      errors.push("Description must be a string");
    }
  }

  // Status validation (optional)
  if (status !== undefined) {
    if (status === null) {
      // Allow null to clear the field
    } else if (typeof status !== "string") {
      errors.push("Status must be a string");
    } else if (!["pending", "in_progress", "completed"].includes(status)) {
      errors.push("Status must be one of: pending, in_progress, completed");
    }
  }

  // Priority validation (optional)
  if (priority !== undefined) {
    if (priority === null) {
      // Allow null to clear the field
    } else if (typeof priority !== "string") {
      errors.push("Priority must be a string");
    } else if (!["low", "medium", "high"].includes(priority)) {
      errors.push("Priority must be one of: low, medium, high");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: errors,
    });
  }

  next();
}

/**
 * Validate todo status update
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function validateTodoStatusUpdate(req, res, next) {
  const { status } = req.body;
  const errors = [];

  // Status validation (required)
  if (!status) {
    errors.push("Status is required");
  } else if (typeof status !== "string") {
    errors.push("Status must be a string");
  } else if (!["pending", "in_progress", "completed"].includes(status)) {
    errors.push("Status must be one of: pending, in_progress, completed");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: errors,
    });
  }

  next();
}

/**
 * Validate ID parameter
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function validateIdParam(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "ID parameter is required",
    });
  }

  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({
      success: false,
      error: "ID must be a positive integer",
    });
  }

  next();
}

module.exports = {
  validateTodoCreation,
  validateTodoUpdate,
  validateTodoStatusUpdate,
  validateIdParam,
};
