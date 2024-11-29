Expense Tracker
A full-stack application for tracking income, built with Node.js and React.

Setup Instructions
1. Prerequisites
Node.js and npm: Install Node.js
PostgreSQL: Install PostgreSQL
2. Backend Setup
Navigate to the backend:
bash

cd expense-tracker-backend
Install dependencies:
bash

npm install
Configure environment variables in .env:
env

DB_USER=<your_db_username>
DB_PASSWORD=<your_db_password>
DB_NAME=<your_database_name>
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=<your_secret_key>
PORT=5000
Set up the database:
sql

CREATE TABLE users (
    user_name VARCHAR(255) PRIMARY KEY,
    password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE income (
    income_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) REFERENCES users(user_name) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Start the backend:
bash
npm run build
npm start
3. Frontend Setup
Navigate to the frontend:
cd ../expense-tracker-frontend
Install dependencies:

npm install
Configure environment variables in .env:
env

REACT_APP_BACKEND_URL=http://localhost:5000
Start the frontend:
bash

npm start
4. Run the Application
Frontend: http://localhost:3000
Backend: http://localhost:5000