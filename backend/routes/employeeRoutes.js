// backend/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const { getAllEmployees, createEmployee,deleteEmployee } = require('../controllers/employeeController');

router.route('/')
  .get(getAllEmployees)    // GET /api/employees
  .post(createEmployee);   // POST /api/employees

  router.route('/:id')
  .delete(deleteEmployee);

module.exports = router;
