// src/api/taskApi.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Task Operations ---
export const getDashboardSummary = () => api.get('/dashboard');
export const getAllTasks = (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  return api.get(`/tasks?${queryString}`);
};
export const getTaskById = (taskId) => api.get(`/tasks/${taskId}`);
export const createTask = (taskData) => api.post('/tasks', taskData);
export const updateTask = (taskId, taskData) => api.put(`/tasks/${taskId}`, taskData);
export const updateTaskStatus = (taskId, statusData) => api.put(`/tasks/${taskId}`, statusData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

// --- Employee Operations ---
export const getAllEmployees = () => api.get('/employees');
export const createEmployee = (employeeData) => api.post('/employees', employeeData);
export const deleteEmployee = (employeeId) => api.delete(`/employees/${employeeId}`);