# Task Manager API

A RESTful API for managing tasks built with Node.js and Express. This API provides full CRUD (Create, Read, Update, Delete) operations for tasks with proper validation and error handling.

## Features

- ✅ **CRUD Operations** - Create, read, update, and delete tasks
- ✅ **Input Validation** - Middleware-based validation for all requests
- ✅ **Error Handling** - Centralized error handling with appropriate HTTP status codes
- ✅ **RESTful Design** - Follows REST API best practices
- ✅ **File-based Storage** - Tasks are persisted in JSON format
- ✅ **Type Safety** - Validates data types (string, boolean, number)

## Prerequisites

- Node.js >= 18.0.0
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task-manager-api-arshad3030
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The server will start on `http://localhost:3000`

## Project Structure

```
task-manager-api-arshad3030/
├── app.js                 # Main application entry point
├── controllers/           # Business logic
│   └── taskController.js  # Task controller with CRUD operations
├── middleware/            # Custom middleware
│   ├── validation.js     # Input validation middleware
│   └── errorHandler.js   # Error handling middleware
├── routes/                # Route definitions
│   └── taskRoutes.js     # Task routes
├── test/                  # Test files
│   └── server.test.js    # API tests
├── task.json             # Data storage (JSON file)
└── package.json          # Project dependencies
```

## API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoints

#### 1. Get All Tasks

Retrieve all tasks from the system.

**Request:**

```http
GET /tasks
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  },
  {
    "id": 2,
    "title": "Create a new project",
    "description": "Create a new project using the Express application generator",
    "completed": false
  }
]
```

**Status Codes:**

- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

#### 2. Get Task by ID

Retrieve a specific task by its ID.

**Request:**

```http
GET /tasks/:id
```

**Parameters:**

- `id` (integer) - Task ID

**Response:**

```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
```

**Status Codes:**

- `200 OK` - Success
- `400 Bad Request` - Invalid task ID format
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

---

#### 3. Create Task

Create a new task.

**Request:**

```http
POST /tasks
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "New Task",
  "description": "Task description",
  "completed": false
}
```

**Validation Rules:**

- `title` (required) - Must be a non-empty string
- `description` (required) - Must be a non-empty string
- `completed` (required) - Must be a boolean value

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 16,
    "title": "New Task",
    "description": "Task description",
    "completed": false
  }
}
```

**Status Codes:**

- `201 Created` - Task created successfully
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Server error

---

#### 4. Update Task

Update an existing task by ID.

**Request:**

```http
PUT /tasks/:id
Content-Type: application/json
```

**Parameters:**

- `id` (integer) - Task ID

**Request Body:**

```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```

**Note:** All fields are optional. Only provided fields will be updated.

**Validation Rules:**

- `title` (optional) - If provided, must be a non-empty string
- `description` (optional) - If provided, must be a non-empty string
- `completed` (optional) - If provided, must be a boolean value

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Task",
    "description": "Updated description",
    "completed": true
  }
}
```

**Status Codes:**

- `200 OK` - Task updated successfully
- `400 Bad Request` - Invalid input or task ID
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

---

#### 5. Delete Task

Delete a task by ID.

**Request:**

```http
DELETE /tasks/:id
```

**Parameters:**

- `id` (integer) - Task ID

**Response:**

```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  }
}
```

**Status Codes:**

- `200 OK` - Task deleted successfully
- `400 Bad Request` - Invalid task ID format
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

---

## Usage Examples

### Using cURL

**Get all tasks:**

```bash
curl http://localhost:3000/tasks
```

**Get task by ID:**

```bash
curl http://localhost:3000/tasks/1
```

**Create a new task:**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Express",
    "description": "Study middleware and routing",
    "completed": false
  }'
```

**Update a task:**

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "completed": true
  }'
```

**Delete a task:**

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

### Using JavaScript (fetch)

```javascript
// Get all tasks
const response = await fetch("http://localhost:3000/tasks");
const tasks = await response.json();

// Create a task
const newTask = await fetch("http://localhost:3000/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "New Task",
    description: "Task description",
    completed: false,
  }),
});
const result = await newTask.json();
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

### Validation Errors (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Title is required and must be a non-empty string",
    "Completed is required and must be a boolean value"
  ]
}
```

### Not Found Errors (404)

```json
{
  "success": false,
  "message": "Task not found"
}
```

### Server Errors (500)

```json
{
  "success": false,
  "message": "Error accessing task file"
}
```

## Testing

Run the test suite:

```bash
npm test
```

The test suite includes:

- ✅ POST /tasks - Create task
- ✅ POST /tasks with invalid data - Validation
- ✅ GET /tasks - Get all tasks
- ✅ GET /tasks/:id - Get task by ID
- ✅ GET /tasks/:id with invalid id - Error handling
- ✅ PUT /tasks/:id - Update task
- ✅ PUT /tasks/:id with invalid id - Error handling
- ✅ PUT /tasks/:id with invalid data - Validation
- ✅ DELETE /tasks/:id - Delete task
- ✅ DELETE /tasks/:id with invalid id - Error handling

## Middleware

### Validation Middleware

The API uses custom validation middleware to ensure data integrity:

- **validateCreateTask** - Validates POST requests (all fields required)
- **validateUpdateTask** - Validates PUT requests (all fields optional)
- **validateTaskId** - Validates task ID parameter (must be positive integer)

### Error Handling Middleware

Centralized error handling with:

- **errorHandler** - Catches and formats all errors
- **notFoundHandler** - Handles 404 for undefined routes

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supertest** - HTTP assertion library for testing
- **Tap** - Test framework

## License

ISC

## Author

Airtribe

---

## Notes

- Tasks are stored in `task.json` file
- Task IDs are auto-generated (incremental)
- The server runs on port 3000 by default
- All timestamps and IDs are managed automatically
