// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById
} = require('../controllers/taskController');

router.route('/')
  .get(getAllTasks)    // GET /api/tasks (and filtering)
  .post(createTask);   // POST /api/tasks

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)     // PUT /api/tasks/:id
  .delete(deleteTask); // DELETE /api/tasks/:id

module.exports = router;