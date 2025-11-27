import React, { useState, useEffect } from 'react';
import { getDashboardSummary } from '../api/taskApi';

const Dashboard = () => {
  // State holds both overall metrics and the employee breakdown
  const [summary, setSummary] = useState({ 
    overall: { totalTasks: 0, completedTasks: 0, completionRate: 0 },
    employees: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await getDashboardSummary();
      // The backend returns data in the structure { overall: {...}, employees: [...] }
      setSummary(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard summary:", err);
      setError("Failed to load dashboard data. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading Dashboard...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  const { overall, employees } = summary;
  const completionPercentage = overall.completionRate || 0;
  
  const progressStyle = {
    width: `${completionPercentage}%`,
    backgroundColor: completionPercentage >= 90 ? '#198754' : completionPercentage >= 50 ? '#ffc107' : '#dc3545' // Bootstrap colors
  };

  return (
    <div className="dashboard-page">
      <h2 className="mb-4">📊 Task Overview Dashboard</h2>

      {/* 1. OVERALL SUMMARY CARDS */}
      <div className="row g-4 mb-5">
        
        {/* Total Tasks Card */}
        <div className="col-md-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Tasks</h5>
              <p className="card-text fs-1">
                {overall.totalTasks}
              </p>
            </div>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="col-md-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Completed Tasks</h5>
              <p className="card-text fs-1">
                {overall.completedTasks}
              </p>
            </div>
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">Completion Rate</h5>
              <p className="card-text fs-1 text-dark">
                {completionPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <h3>Overall Progress</h3>
      <div className="progress mb-5" style={{ height: '30px' }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={progressStyle}
          aria-valuenow={completionPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {completionPercentage}% Complete
        </div>
      </div>

      <hr className="my-5" />

      {/* 2. EMPLOYEE BREAKDOWN TABLE */}
      <h3>👤 Employee Task Performance</h3>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Employee</th>
              <th>Position</th>
              <th>Total Tasks</th>
              <th>Completed Tasks</th>
              <th>Completion Rate</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.totalTasks}</td>
                <td>{emp.completedTasks}</td>
                <td>
                  <span className={`badge bg-${emp.completionRate >= 80 ? 'success' : emp.completionRate >= 50 ? 'warning text-dark' : 'danger'}`}>
                    {emp.completionRate}%
                  </span>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center">No tasks assigned to employees yet.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;