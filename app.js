const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/", taskRoutes);

// Error handling middleware (must be after routes)
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
app.use(notFoundHandler); // 404 handler for undefined routes
app.use(errorHandler); // General error handler

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
