import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',
    database: 'expense_tracker', 
    password: '1622', 
    port: 5432, 
});

console.log("Attempting to connect to the database...");

pool.connect()
    .then(() => {
        console.log("Connected to the database successfully!");
        pool.end(); 
    })
    .catch((err: Error) => {
        console.error("Error connecting to the database:", err.message);
        pool.end(); 
    });
