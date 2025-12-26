// Validation middleware for task input

// Validate task creation (POST)
const validateCreateTask = (req, res, next) => {
  const { title, description, completed } = req.body;
  const errors = [];

  // Validate title
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    errors.push("Title is required and must be a non-empty string");
  }

  // Validate description
  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length === 0
  ) {
    errors.push("Description is required and must be a non-empty string");
  }

  // Validate completed
  if (completed === undefined || typeof completed !== "boolean") {
    errors.push("Completed is required and must be a boolean value");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

// Validate task update (PUT)
const validateUpdateTask = (req, res, next) => {
  const { title, description, completed } = req.body;
  const errors = [];

  // Validate title if provided
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      errors.push("Title must be a non-empty string");
    }
  }

  // Validate description if provided
  if (description !== undefined) {
    if (typeof description !== "string" || description.trim().length === 0) {
      errors.push("Description must be a non-empty string");
    }
  }

  // Validate completed if provided
  if (completed !== undefined && typeof completed !== "boolean") {
    errors.push("Completed must be a boolean value");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

// Validate task ID parameter
const validateTaskId = (req, res, next) => {
  const taskId = parseInt(req.params.id);

  if (isNaN(taskId) || taskId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID. ID must be a positive integer",
    });
  }

  req.params.id = taskId; // Store parsed ID for use in controller
  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
};
