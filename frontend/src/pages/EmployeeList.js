import React, { useState, useEffect } from 'react';
import { 
  getAllEmployees, 
  createEmployee, 
  deleteEmployee 
} from '../api/taskApi'; 

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeePosition, setNewEmployeePosition] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createError, setCreateError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getAllEmployees();
      setEmployees(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load employee list. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    setCreateError(null);

    if (!newEmployeeName.trim()) {
      setCreateError('Employee name is required.');
      return;
    }
    
    try {
      await createEmployee({ 
        name: newEmployeeName.trim(), 
        position: newEmployeePosition.trim() 
      });
      
      // Clear the form fields
      setNewEmployeeName('');
      setNewEmployeePosition('');
      
      fetchEmployees(); // Refresh list
    } catch (err) {
      console.error("Error adding employee:", err);
      setCreateError('Failed to add employee. Check API logs.');
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm('WARNING: Deleting this employee will also delete ALL their assigned tasks permanently. Proceed?')) {
      return;
    }
    try {
      await deleteEmployee(id); // Triggers cascading delete on the backend
      fetchEmployees(); // Refresh list
    } catch (err) {
      console.error("Error deleting employee:", err);
      alert('Failed to delete employee. See console for details.');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading Employees...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="employee-list-page">
      <h2 className="mb-4">👤 Employee Directory</h2>

      {/* Employee Creation Form */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="card-title">Add New Employee</h5>
        {createError && <div className="alert alert-danger p-2">{createError}</div>}
        <form onSubmit={handleCreateEmployee} className="row g-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Employee Name"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Position (e.g., Engineer, Designer)"
              value={newEmployeePosition}
              onChange={(e) => setNewEmployeePosition(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Add</button>
          </div>
        </form>
      </div>

      {/* Employee List Table */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Date Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => handleDeleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {employees.length === 0 && <p className="text-center mt-3">No employees found.</p>}
      </div>
    </div>
  );
};

export default EmployeeList;