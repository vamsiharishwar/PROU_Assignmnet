import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api/taskApi';

const initialFormState = {
  title: '',
  description: '',
  employee: '', // Employee ID (required for assignment)
  dueDate: '',
  status: 'Pending',
};

/**
 * TaskForm component for creating a new task or editing an existing one.
 * @param {object} props.taskToEdit - The task object to pre-fill the form (null for creation).
 * @param {array} props.employees - List of employees for the dropdown.
 * @param {function} props.onSubmitSuccess - Callback on successful submission.
 * @param {function} props.onCancel - Callback when the user cancels the form.
 */
const TaskForm = ({ taskToEdit, employees, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to handle switching between CREATE mode and EDIT mode
  useEffect(() => {
    if (taskToEdit) {
      // Logic for EDIT mode: Pre-fill form data
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        // Use the employee ID from the reference (handles potential nested object)
        employee: taskToEdit.employee?._id || taskToEdit.employee || '',
        // Convert Date object to YYYY-MM-DD string for input type="date"
        dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '',
        status: taskToEdit.status || 'Pending',
      });
    } else {
      // Logic for CREATE mode: Reset to initial state
      setFormData(initialFormState);
    }
    setError(null); // Clear errors when mode changes
  }, [taskToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // --- Basic Client-Side Validation ---
    if (!formData.title || !formData.employee) {
      setError("Title and Employee assignment are required fields.");
      setLoading(false);
      return;
    }

    try {
      if (taskToEdit) {
        // --- EDIT MODE ---
        await updateTask(taskToEdit._id, formData);
      } else {
        // --- CREATE MODE ---
        await createTask(formData);
      }

      // Success: notify parent component and reset form state
      onSubmitSuccess();

    } catch (err) {
      console.error("Submission Error:", err.response ? err.response.data : err);
      // Display error message from the backend if available
      const errorMessage = err.response?.data?.error || "An unexpected error occurred during submission.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formTitle = taskToEdit ? 'Edit Task' : 'Create New Task';

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-3">{formTitle}</h5>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {/* Title */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Title*</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        {/* Employee Assignment */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Employee*</label>
          <select className="form-select" name="employee" value={formData.employee} onChange={handleChange} required>
            <option value="" disabled>Select Employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>{emp.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {/* Due Date */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Due Date</label>
          <input type="date" className="form-control" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        </div>

        {/* Status */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Status</label>
          <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
      </div>

      <div className="d-flex justify-content-end pt-2">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
            Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : taskToEdit ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;