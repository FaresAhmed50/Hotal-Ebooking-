const db = require('../models/db');

const LoginLog = {
  // Using async/await for create
  create: async (logData) => {
    const { user_id, ip_address } = logData;
    const query = `
      INSERT INTO login_logs (user_id, ip_address)
      VALUES (?, ?)
    `;
    try {
      const [result] = await db.query(query, [user_id, ip_address]);  // Await the query result
      return result; // Return the result of the insertion (typically the affected rows or inserted ID)
    } catch (err) {
      throw new Error('Error creating login log: ' + err.message);
    }
  },
};

module.exports = LoginLog;
