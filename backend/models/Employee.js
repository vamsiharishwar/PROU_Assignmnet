// backend/models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Employee name is required.'],
    trim: true
  },
  position: {
    type: String,
    default: 'Staff'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Employee', EmployeeSchema);