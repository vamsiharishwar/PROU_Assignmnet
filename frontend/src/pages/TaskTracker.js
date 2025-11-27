import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from '../components/TaskForm'; 
import {
  getAllTasks,
  getAllEmployees,
  deleteTask,
  updateTaskStatus
} from '../api/taskApi';

import TaskTable from '../components/TaskTable';
import TaskFilter from '../components/TaskFilter';


const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({ status: '', employeeId: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for EDITING (Inline or Modal Form)
  const [inlineFormTaskId, setInlineFormTaskId] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // State for ADDING (Separate Form/Modal)
  const [showAddTaskForm, setShowAddTaskForm] = useState(false); 

  // ============================
  // Fetch Data
  // ============================
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch tasks using the current filters and all employees
      const [taskRes, employeeRes] = await Promise.all([
        getAllTasks(filters),
        getAllEmployees()
      ]);

      setTasks(taskRes.data.data);
      setEmployees(employeeRes.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load tasks or employee data.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // Fetches data when component mounts or filters change
    fetchData();
  }, [fetchData]);

  // ============================
  // Handlers
  // ============================
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error("Error updating task status:", err);
      alert("Failed to update task status.");
    }
  };

  const handleEditTask = (task) => {
    // Start editing: hide Add form, show inline/modal edit form
    setInlineFormTaskId(task._id);
    setTaskToEdit(task);
    setShowAddTaskForm(false);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId);
      fetchData();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Unable to delete task.");
    }
  };

  const handleFormSuccess = () => {
    // Called after successful ADD or EDIT
    setInlineFormTaskId(null); 
    setTaskToEdit(null);
    setShowAddTaskForm(false); 
    fetchData(); // Refresh list to show changes
  };

  const handleCancelForm = () => {
    // Called when the user cancels ADD or EDIT
    setInlineFormTaskId(null); 
    setTaskToEdit(null);
    setShowAddTaskForm(false); 
  }

  // ============================
  // Render
  // ============================
  if (loading) return <div className="text-center mt-5">Loading Tasks...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="task-tracker-page container mt-4">
      {/* HEADER & ADD BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📝 Task Management</h2>
        <button 
          className="btn btn-success" 
          onClick={() => {
            setShowAddTaskForm(prev => !prev); 
            setInlineFormTaskId(null); 
            setTaskToEdit(null); 
          }}
        >
          {showAddTaskForm ? 'Close Form' : '+ Add New Task'}
        </button>
      </div>

      {/* ADD TASK FORM SECTION */}
      {showAddTaskForm && (
        <div className="card p-4 mb-4 shadow-sm">
          <TaskForm 
            // Null taskToEdit forces CREATE mode
            taskToEdit={null} 
            employees={employees} 
            onSubmitSuccess={handleFormSuccess} 
            onCancel={handleCancelForm} 
          />
        </div>
      )}
      
      {/* FILTERS */}
      <TaskFilter
        employees={employees}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* TABLE */}
      <div className="mt-4">
        <TaskTable
          tasks={tasks}
          employees={employees}
          onStatusUpdate={handleStatusUpdate}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          inlineFormTaskId={inlineFormTaskId}
          taskToEdit={taskToEdit}
          onFormSuccess={handleFormSuccess}
        />

        {tasks.length === 0 && (
          <p className="text-center mt-5">No tasks found for selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default TaskTracker;