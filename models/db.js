const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a pool of connections
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection to the database by making a simple query
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Database connected successfully');
  connection.release(); // Always release the connection back to the pool
});

module.exports = pool;
