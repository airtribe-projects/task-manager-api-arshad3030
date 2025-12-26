const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
} = require("../middleware/validation");

// GET /tasks - Retrieve all tasks
router.get("/tasks", taskController.getAllTasks);

// GET /tasks/:id - Retrieve a specific task by ID
router.get("/tasks/:id", validateTaskId, taskController.getTaskById);

// POST /tasks - Create a new task
router.post("/tasks", validateCreateTask, taskController.createTask);

// PUT /tasks/:id - Update an existing task by ID
router.put(
  "/tasks/:id",
  validateTaskId,
  validateUpdateTask,
  taskController.updateTask
);

// DELETE /tasks/:id - Delete a task by ID
router.delete("/tasks/:id", validateTaskId, taskController.deleteTask);

module.exports = router;
