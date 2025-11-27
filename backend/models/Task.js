// backend/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required.'],
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  dueDate: {
    type: Date
  },
  employee: {
    // This is the "Foreign Key" reference in MongoDB/Mongoose
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference the 'Employee' model
    required: [true, 'Task must be assigned to an employee.']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);