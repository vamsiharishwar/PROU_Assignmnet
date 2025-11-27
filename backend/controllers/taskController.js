// backend/controllers/taskController.js

const Task = require('../models/Task');
const Employee = require('../models/Employee');
const mongoose = require('mongoose');

// -------------------------------
//      GET ALL TASKS (FILTER)
// -------------------------------
exports.getAllTasks = async (req, res) => {
  console.log("➡️ getAllTasks() called");

  try {
    const { status, employeeId } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (employeeId) filter.employee = employeeId;

    const tasks = await Task.find(filter)
      .populate('employee', 'name position');

    console.log(`✅ Tasks fetched: ${tasks.length}`);

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.log("❌ Error fetching tasks:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message
    });
  }
};

// -------------------------------
//          CREATE TASK
// -------------------------------
exports.createTask = async (req, res) => {
  console.log("➡️ createTask() called");

  try {
    const employeeExists = await Employee.findById(req.body.employee);
    if (!employeeExists) {
      console.log("❌ Employee not found for task creation");
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const task = await Task.create(req.body);

    console.log("✅ Task created:", task._id);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    console.log("❌ Error creating task:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to create task",
      error: error.message
    });
  }
};

// -------------------------------
//          UPDATE TASK
// -------------------------------
exports.updateTask = async (req, res) => {
  console.log(`➡️ updateTask() called for ID: ${req.params.id}`);

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      console.log("❌ Task not found");
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    console.log("✅ Task updated:", task._id);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (error) {
    console.log("❌ Error updating task:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to update task",
      error: error.message
    });
  }
};

// -------------------------------
//          DELETE TASK
// -------------------------------
exports.deleteTask = async (req, res) => {
  console.log(`➡️ deleteTask() called for ID: ${req.params.id}`);

  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      console.log("❌ Task not found for deletion");
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    console.log("🗑️ Task deleted:", task._id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.log("❌ Error deleting task:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message
    });
  }
};

// -------------------------------
//          DASHBOARD SUMMARY
// -------------------------------
// exports.getSummary = async (req, res) => {
//   console.log("➡️ getSummary() called");

//   try {
//     const summary = await Task.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalTasks: { $sum: 1 },
//           completedTasks: {
//             $sum: {
//               $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0]
//             }
//           }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           totalTasks: 1,
//           completedTasks: 1,
//           completionRate: {
//             $round: [
//               {
//                 $multiply: [
//                   { $cond: [{ $eq: ['$totalTasks', 0] }, 0, { $divide: ['$completedTasks', '$totalTasks'] }] },
//                   100
//                 ]
//               },
//               2
//             ]
//           }
//         }
//       }
//     ]);

//     const result = summary.length > 0
//       ? summary[0]
//       : { totalTasks: 0, completedTasks: 0, completionRate: 0 };

//     console.log("📊 Summary fetched:", result);

//     res.status(200).json({
//       success: true,
//       message: "Summary fetched successfully",
//       data: result
//     });

//   } catch (error) {
//     console.log("❌ Error fetching summary:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch summary",
//       error: error.message
//     });
//   }
// };

// backend/controllers/taskController.js

// ... existing code and imports ...

// GET /api/dashboard - Calculate summary statistics (Overall + Per Employee)
exports.getSummary = async (req, res) => {
  try {
    // 1. Calculate Overall Summary (as before)
    const overallSummary = await Task.aggregate([
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } }
        }
      },
      {
        $project: {
          _id: 0,
          totalTasks: 1,
          completedTasks: 1,
          completionRate: { $round: [{ $multiply: [{ $divide: ['$completedTasks', '$totalTasks'] }, 100] }, 2] }
        }
      }
    ]);
    const overallResult = overallSummary.length > 0 ? overallSummary[0] : { totalTasks: 0, completedTasks: 0, completionRate: 0 };


    // 2. Calculate Summary Per Employee
    const employeeSummary = await Task.aggregate([
      // Group by the employee field (which is their ObjectId)
      {
        $group: {
          _id: '$employee', // Group by employee ID
          employeeId: { $first: '$employee' }, // Keep the employee ID for the lookup
          totalTasks: { $sum: 1 },
          completedTasks: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
        }
      },
      // Lookup the employee details using the ID
      {
        $lookup: {
          from: 'employees', // The name of the employee collection in MongoDB
          localField: 'employeeId',
          foreignField: '_id',
          as: 'employeeDetails'
        }
      },
      // Deconstruct the employeeDetails array (should only have 1 element)
      { $unwind: '$employeeDetails' },
      // Project the final fields and calculate the rate
      {
        $project: {
          _id: 0,
          name: '$employeeDetails.name',
          position: '$employeeDetails.position',
          totalTasks: 1,
          completedTasks: 1,
          completionRate: { $round: [{ $multiply: [{ $divide: ['$completedTasks', '$totalTasks'] }, 100] }, 2] }
        }
      }
    ]);

    // Send both results back to the frontend
    res.status(200).json({ 
      success: true, 
      data: {
        overall: overallResult,
        employees: employeeSummary // New employee breakdown data
      }
    });

  } catch (error) {
    console.log("❌ Error in getSummary():", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// backend/controllers/taskController.js (Add this function)
// ... existing imports ...
//const Task = require('../models/Task');

// GET /api/tasks/:id - View a single task
exports.getTaskById = async (req, res) => {
  const taskId = req.params.id;
  console.log(`📌 getTaskById() called for ID: ${taskId}`);

  try {
    // Use .populate('employee') to fetch the full employee object referenced by employeeId
    const task = await Task.findById(taskId).populate('employee', 'name position');

    if (!task) {
      console.log(`❌ Task not found for ID: ${taskId}`);
      return res.status(404).json({ success: false, error: 'Task not found.' });
    }

    console.log(`✔ getTaskById() completed.`);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    console.log("❌ Error in getTaskById():", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
// ... existing functions ...