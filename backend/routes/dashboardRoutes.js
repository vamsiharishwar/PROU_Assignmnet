// backend/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/taskController'); // Uses the controller defined above

router.route('/').get(getSummary); // GET /api/dashboard

module.exports = router;