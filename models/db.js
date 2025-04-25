const mysql = require('mysql2/promise'); // Use promise-based API
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

// Test the connection
pool.getConnection()
  .then((conn) => {
    console.log('Connected to MySQL database');
    conn.release(); // Release the connection back to the pool
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// Export the pool for reusability
module.exports = pool;