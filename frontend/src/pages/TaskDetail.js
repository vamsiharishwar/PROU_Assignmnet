import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTaskById } from '../api/taskApi'; 

const TaskDetail = () => {
  // useParams hook extracts the 'id' parameter from the URL path: /tasks/:id
  const { id } = useParams(); 
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]); // Dependency array ensures fetch runs only when component mounts or ID changes

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await getTaskById(id);
      setTask(response.data.data); // This data includes the populated employee object
      setError(null);
    } catch (err) {
      console.error("Error fetching task details:", err);
      setError("Failed to load task details. Task may not exist or API is down.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading Task Details...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!task) return <div className="text-center mt-5">Task not found.</div>;

  // Helper to determine the status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-success';
      case 'In Progress':
        return 'bg-warning text-dark';
      default: // Pending
        return 'bg-secondary';
    }
  };

  return (
    <div className="task-detail-page card shadow-lg p-4">
      <h2 className="card-title mb-4">📝 Task Details: {task.title}</h2>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <p className="lead">
            <strong>Assigned Employee:</strong> {task.employee ? task.employee.name : 'Unassigned'}
          </p>
          <p>
            <strong>Employee Position:</strong> {task.employee ? task.employee.position : 'N/A'}
          </p>
        </div>
        <div className="col-md-6 text-md-end">
          <span className={`badge fs-5 p-2 ${getStatusBadge(task.status)}`}>
            Status: {task.status}
          </span>
        </div>
      </div>
      
      <hr />

      <p className="h5">Description:</p>
      <p className="alert alert-light p-3 border">
        {task.description || 'No detailed description provided.'}
      </p>

      <div className="row">
        <div className="col-md-6">
          <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not Set'}</p>
        </div>
        <div className="col-md-6">
          <p><strong>Created On:</strong> {new Date(task.createdAt).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <Link to="/tasks" className="btn btn-secondary">← Back to Task List</Link>
      </div>
    </div>
  );
};

export default TaskDetail;