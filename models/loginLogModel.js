const db = require('./db');

const LoginLog = {
  create: (logData, callback) => {
    const { user_id, ip_address } = logData;
    const query = `
      INSERT INTO login_logs (user_id, ip_address)
      VALUES (?, ?)
    `;
    db.query(query, [user_id, ip_address], callback);
  },
};

module.exports = LoginLog;