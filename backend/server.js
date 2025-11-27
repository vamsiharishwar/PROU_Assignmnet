// backend/server.js
require('dotenv').config(); // Load environment variables first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const employeeRoutes = require('./routes/employeeRoutes'); 
const taskRoutes = require('./routes/taskRoutes'); // ⬅ Import task routes here
const dashboardRoutes = require('./routes/dashboardRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(cors()); // Enable CORS for frontend communication

// ================================
//        Mount Routes
// ================================
app.use('/api/employees', employeeRoutes);   // Employee routes
app.use('/api/tasks', taskRoutes);           // ⬅ Task routes added
app.use('/api/dashboard', dashboardRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Task Tracker API is running.');
});

// DB Connection + Start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process if connection fails
  });
