// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components and Pages Imports
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TaskTracker from './pages/TaskTracker';
import TaskDetail from './pages/TaskDetail';
import EmployeeList from './pages/EmployeeList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskTracker />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;