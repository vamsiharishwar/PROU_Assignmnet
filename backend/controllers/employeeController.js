// backend/controllers/employeeController.js
const Employee = require('../models/Employee');
const Task = require('../models/Task');
// GET /api/employees - View all employees
exports.getAllEmployees = async (req, res) => {
  console.log("📌 getAllEmployees() called...");

  
  try {
    const employees = await Employee.find({});
    
    console.log(`✔ getAllEmployees() completed - Found ${employees.length} employees`);
    
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.log("❌ Error in getAllEmployees():", error.message);
    
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST /api/employees - Add new employee
exports.createEmployee = async (req, res) => {
  console.log("📌 createEmployee() called...");
  console.log("➡ Received Data:", req.body);

  try {
    const employee = await Employee.create(req.body);

    console.log(`✔ createEmployee() completed - New employee added: ${employee.name}`);

    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    console.log("❌ Error in createEmployee():", error.message);

    res.status(400).json({ success: false, error: error.message });
  }
};


exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  console.log(`📌 deleteEmployee() called for ID: ${employeeId}`);

  try {
    // 1. Find the employee to ensure they exist before proceeding
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      console.log(`❌ Employee not found for ID: ${employeeId}`);
      return res.status(404).json({ success: false, error: 'Employee not found.' });
    }

    // 2. Delete all tasks associated with this employee
    // The 'employee' field in the Task model holds the employee's ID
    const deleteTasksResult = await Task.deleteMany({ employee: employeeId });

    // 3. Delete the employee document
    await Employee.deleteOne({ _id: employeeId }); // Use deleteOne or findByIdAndDelete

    console.log(`✔ deleteEmployee() completed.`);
    console.log(`   - Deleted ${deleteTasksResult.deletedCount} associated task(s).`);
    console.log(`   - Deleted Employee: ${employee.name}`);

    res.status(200).json({ 
      success: true, 
      message: 'Employee and all associated tasks deleted successfully.',
      deletedTasks: deleteTasksResult.deletedCount
    });

  } catch (error) {
    console.log("❌ Error in deleteEmployee():", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};