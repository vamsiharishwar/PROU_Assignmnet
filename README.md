📝 Employee Task Tracker (MERN Stack)
This is a full-stack web application designed to manage employee assignments and task status, built using the MERN (MongoDB, Express, React, Node.js) technology stack.

🎯 Key Features
Employee Management: CRUD operations for employees, including a cascading delete (deleting an employee also deletes all their associated tasks).

Task Management: Full CRUD operations for tasks (Create, Read/Filter, Update, Delete).

Task Filtering: Filter tasks by employee, status (Pending, In Progress, Completed).

Dashboard: Provides real-time metrics including overall task completion rate and per-employee performance breakdown.

Task Detail View: Dedicated page for viewing the full context of a single task.

🚀 Architecture Overview
The system is structured as a monorepo, separating the client and server into distinct directories that communicate via a REST API.
Component,Technology,Role
Client (frontend),"React, React Router, Axios, Bootstrap","Handles UI, routing, and state management."
Server (backend),"Node.js, Express.js","REST API server, business logic, and data validation."
Database,"MongoDB, Mongoose",Persistent data storage and schema management.

🛠️ Installation and Setup
Prerequisites
Ensure the following tools are installed on your system:

Node.js (v14+) and npm

MongoDB (Local instance running, usually on port 27017)

Git

Step 1: Clone and Install Dependencies

# 1. Clone the repository
  git clone:  https://github.com/vamsiharishwar/PROU_Assignmnet
cd PROU_Assignment

# 2. Install Backend Dependencies
cd backend
npm install

# 3. Install Frontend Dependencies
cd ../frontend
npm install

# 4. Return to Project Root
cd ..

My apologies! I used the saved information about your Model Recommender System project instead of focusing on the Employee Task Tracker MERN project we just finished rebuilding. Thank you for correcting me.Here is the comprehensive README.md tailored specifically for your Employee Task Tracker (MERN Stack), covering all the backend, frontend, and API details.📝 Employee Task Tracker (MERN Stack)This is a full-stack web application designed to manage employee assignments and task status, built using the MERN (MongoDB, Express, React, Node.js) technology stack.🎯 Key FeaturesEmployee Management: CRUD operations for employees, including a cascading delete (deleting an employee also deletes all their associated tasks).Task Management: Full CRUD operations for tasks (Create, Read/Filter, Update, Delete).Task Filtering: Filter tasks by employee, status (Pending, In Progress, Completed).Dashboard: Provides real-time metrics including overall task completion rate and per-employee performance breakdown.Task Detail View: Dedicated page for viewing the full context of a single task.🚀 Architecture OverviewThe system is structured as a monorepo, separating the client and server into distinct directories that communicate via a REST API.ComponentTechnologyRoleClient (frontend)React, React Router, Axios, BootstrapHandles UI, routing, and state management.Server (backend)Node.js, Express.jsREST API server, business logic, and data validation.DatabaseMongoDB, MongoosePersistent data storage and schema management.🛠️ Installation and SetupPrerequisitesEnsure the following tools are installed on your system:Node.js (v14+) and npmMongoDB (Local instance running, usually on port 27017)GitStep 1: Clone and Install DependenciesBash# 1. Clone the repository
git clone https://github.com/vamsiharishwar/TaskManagementAPP.git
cd TaskManagementAPP

# 2. Install Backend Dependencies
cd backend
npm install

# 3. Install Frontend Dependencies
cd ../frontend
npm install

# 4. Return to Project Root
cd ..
Step 2: Configuration (.env Files)
Create two separate .env files in their respective folders:1.
Backend Configuration (/backend/.env)PORT=5000
MONGO_URI=mongodb://localhost:27017/taskTrackerDB 
2. Frontend Configuration (/frontend/.env)

REACT_APP_API_BASE_URL=http://localhost:5000/api

Step 3: Start the Servers
You need to run both the backend API and the frontend client concurrently.
# In your first terminal (from the project root /TaskManagementAPP)
cd backend
npm run dev  # Starts the API server on http://localhost:5000
# In your second terminal (from the project root /TaskManagementAPP)
cd frontend
npm start    # Starts the React client on http://localhost:3000
The application will automatically open in your browser, typically at http://localhost:3000.
🔗 API Endpoints
All endpoints are prefixed with /api and handle data in JSON format.

Employee Management
Action,HTTP Method,Endpoint,Description
List All,GET,/api/employees,Retrieves all employee records.
Create,POST,/api/employees,Adds a new employee.
Delete,DELETE,/api/employees/:id,Deletes employee and all associated tasks (Cascade).


Task Management
Action,HTTP Method,Endpoint,Description
List/Filter,GET,/api/tasks?status=...&employeeId=...,"Retrieves all tasks, supports filtering."
View Single,GET,/api/tasks/:id,Retrieves a single task with populated employee details.
Create,POST,/api/tasks,Creates a new task.
Update,PUT,/api/tasks/:id,"Updates task details (e.g., title, status, assignment)."
Delete,DELETE,/api/tasks/:id,Deletes a single task.

Dashboard & Metrics
Action,HTTP Method,Endpoint,Description
Get Summary,GET,/api/dashboard,Returns overall task metrics and a breakdown of performance per employee.

