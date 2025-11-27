import React from 'react';

/**
 * TaskFilter component provides the UI for filtering tasks by status and employee.
 * @param {array} props.employees - List of employee objects for the dropdown.
 * @param {object} props.filters - Current filter values ({ status, employeeId }).
 * @param {function} props.onFilterChange - Callback function to update filters in the parent state.
 */
const TaskFilter = ({ employees, filters, onFilterChange }) => {
  return (
    <div className="row g-3 p-3 bg-light rounded-3 shadow-sm mb-4">
      <div className="col-md-6">
        <label className="form-label">Filter by Status</label>
        <select
          className="form-select"
          value={filters.status}
          // The event handler calls onFilterChange with the field name ('status') and the new value.
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label">Filter by Employee</label>
        <select
          className="form-select"
          value={filters.employeeId}
          // The event handler calls onFilterChange with the field name ('employeeId') and the new value.
          onChange={(e) => onFilterChange('employeeId', e.target.value)}
        >
          <option value="">All Employees</option>
          {/* Map through the employee list to create filter options */}
          {employees.map(employee => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;