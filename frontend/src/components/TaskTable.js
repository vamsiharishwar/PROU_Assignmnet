import React from 'react';
import { Link } from 'react-router-dom'; // Required for the 'Open' button redirection
import TaskForm from './TaskForm'; // Used for inline editing when taskToEdit is set

/**
 * TaskTable component displays the list of tasks and handles inline actions.
 */
const TaskTable = ({ 
  tasks, 
  employees, 
  onStatusUpdate, 
  onEditTask, 
  onDeleteTask, 
  inlineFormTaskId, 
  taskToEdit, 
  onFormSuccess 
}) => {
  // Helper function to determine badge style based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge bg-success';
      case 'In Progress':
        return 'badge bg-warning text-dark';
      default: // Pending
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Employee</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <React.Fragment key={task._id}>
              <tr className={inlineFormTaskId === task._id ? 'table-info' : ''}>
                <td>  {task.title}</td>
                <td>{task.employee ? task.employee.name : 'Unassigned'}</td>
                <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <span className={getStatusBadge(task.status)}>{task.status}</span>
                </td>
                <td>
                  <div className="d-flex align-items-center flex-wrap">
                    
                    {/* 1. Open Button (Redirects to Task Detail Page) */}
                    <Link to={`/tasks/${task._id}`} className="btn btn-primary btn-sm me-2 mb-1">
                      Open
                    </Link>
                    
                    {/* 2. Status Update Dropdown */}
                    <select
                      className="form-select form-select-sm me-2 mb-1"
                      value={task.status}
                      onChange={(e) => onStatusUpdate(task._id, e.target.value)}
                      style={{ maxWidth: '120px' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>

                    {/* 3. Edit/Delete Buttons */}
                    <button 
                      className="btn btn-info btn-sm me-1 mb-1" 
                      onClick={() => onEditTask(task)}
                      disabled={inlineFormTaskId === task._id}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm mb-1" 
                      onClick={() => onDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              
              {/* Conditional Row for Inline Editing */}
              {inlineFormTaskId === task._id && (
                <tr>
                  <td colSpan="5" className="p-4 bg-light border-top border-bottom">
                    <TaskForm
                      taskToEdit={taskToEdit} // The task data being edited
                      employees={employees}
                      onSubmitSuccess={onFormSuccess}
                      onCancel={onFormSuccess} // Re-use onFormSuccess to close/cancel the inline edit
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;