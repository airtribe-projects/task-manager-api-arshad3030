const fs = require("fs");
const path = require("path");

const taskFilePath = path.join(__dirname, "..", "task.json");

// Helper function to read tasks from JSON file
const readTasksFromFile = () => {
  try {
    const data = fs.readFileSync(taskFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error reading tasks file");
  }
};

// Helper function to write tasks to JSON file
const writeTasksToFile = (tasks) => {
  try {
    const data = JSON.stringify({ tasks }, null, 2);
    fs.writeFileSync(taskFilePath, data, "utf8");
  } catch (error) {
    throw new Error("Error writing tasks file");
  }
};

// GET all tasks
const getAllTasks = (req, res, next) => {
  try {
    const taskData = readTasksFromFile();
    res.status(200).json(taskData.tasks);
  } catch (error) {
    // Wrap file read errors
    const fileError = new Error("Error retrieving tasks");
    fileError.statusCode = 500;
    fileError.name = "FileError";
    fileError.originalError = error;
    next(fileError);
  }
};

// GET task by ID
const getTaskById = (req, res, next) => {
  try {
    const taskId = req.params.id; // Already validated and parsed by middleware
    const taskData = readTasksFromFile();
    const task = taskData.tasks.find((t) => t.id === taskId);

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      error.name = "NotFoundError";
      throw error;
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// POST create new task
const createTask = (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    // Validation is handled by middleware, so we can trust the data here

    const taskData = readTasksFromFile();

    // Generate new ID (find max ID and add 1)
    const maxId =
      taskData.tasks.length > 0
        ? Math.max(...taskData.tasks.map((t) => t.id))
        : 0;
    const newId = maxId + 1;

    const newTask = {
      id: newId,
      title: title.trim(),
      description: description.trim(),
      completed: Boolean(completed),
    };

    taskData.tasks.push(newTask);
    writeTasksToFile(taskData.tasks);

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    // If it's already a custom error, pass it along
    if (error.statusCode) {
      return next(error);
    }
    // Otherwise, wrap it as a file error
    const fileError = new Error("Error creating task");
    fileError.statusCode = 500;
    fileError.name = "FileError";
    fileError.originalError = error;
    next(fileError);
  }
};

// PUT update task by ID
const updateTask = (req, res, next) => {
  try {
    const taskId = req.params.id; // Already validated and parsed by middleware
    const { title, description, completed } = req.body;
    // Validation is handled by middleware

    const taskData = readTasksFromFile();
    const taskIndex = taskData.tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      error.name = "NotFoundError";
      throw error;
    }

    // Update task fields (only update provided fields)
    if (title !== undefined) taskData.tasks[taskIndex].title = title.trim();
    if (description !== undefined)
      taskData.tasks[taskIndex].description = description.trim();
    if (completed !== undefined)
      taskData.tasks[taskIndex].completed = Boolean(completed);

    writeTasksToFile(taskData.tasks);

    res.status(200).json({
      success: true,
      data: taskData.tasks[taskIndex],
    });
  } catch (error) {
    // If it's already a custom error, pass it along
    if (error.statusCode) {
      return next(error);
    }
    // Otherwise, wrap it as a file error
    const fileError = new Error("Error updating task");
    fileError.statusCode = 500;
    fileError.name = "FileError";
    fileError.originalError = error;
    next(fileError);
  }
};

// DELETE task by ID
const deleteTask = (req, res, next) => {
  try {
    const taskId = req.params.id; // Already validated and parsed by middleware
    const taskData = readTasksFromFile();
    const taskIndex = taskData.tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      error.name = "NotFoundError";
      throw error;
    }

    const deletedTask = taskData.tasks[taskIndex];
    taskData.tasks.splice(taskIndex, 1);
    writeTasksToFile(taskData.tasks);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    // If it's already a custom error, pass it along
    if (error.statusCode) {
      return next(error);
    }
    // Otherwise, wrap it as a file error
    const fileError = new Error("Error deleting task");
    fileError.statusCode = 500;
    fileError.name = "FileError";
    fileError.originalError = error;
    next(fileError);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
