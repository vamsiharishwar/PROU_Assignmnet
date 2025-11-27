# 📝 Employee Task Tracker (MERN Stack)

This is a full-stack web application designed to manage employee assignments and task status, built using the **MERN** (MongoDB, Express, React, Node.js) technology stack.

## 🎯 Key Features

* **Employee Management:** CRUD operations for employees, including a **cascading delete** (deleting an employee also deletes all their associated tasks).
* **Task Management:** Full CRUD operations for tasks (Create, Read/Filter, Update, Delete).
* **Task Filtering:** Filter tasks by employee, status (**Pending**, **In Progress**, **Completed**).
* **Dashboard:** Provides real-time metrics including overall task completion rate and **per-employee performance breakdown**.
* **Task Detail View:** Dedicated page for viewing the full context of a single task.

---

## 🚀 Architecture Overview

The system is structured as a **monorepo**, separating the client and server into distinct directories that communicate via a **REST API**.

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Client (`frontend`)** | **React**, React Router, Axios, Bootstrap | Handles UI, routing, and state management. |
| **Server (`backend`)** | **Node.js**, Express.js | REST API server, business logic, and data validation. |
| **Database** | **MongoDB**, Mongoose | Persistent data storage and schema management. |

---

## 🛠️ Installation and Setup

### Prerequisites

Ensure the following tools are installed on your system:

1.  **Node.js** (v14+) and npm
2.  **MongoDB** (Local instance running, usually on port 27017)
3.  **Git**

### Step 1: Clone and Install Dependencies

```bash
# 1. Clone the repository
git clone [https://github.com/vamsiharishwar/TaskManagementAPP.git](https://github.com/vamsiharishwar/TaskManagementAPP.git)
cd TaskManagementAPP

# 2. Install Backend Dependencies
cd backend
npm install

# 3. Install Frontend Dependencies
cd ../frontend
npm install

# 4. Return to Project Root
cd ..
