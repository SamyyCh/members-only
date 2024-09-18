const pool = require('./pool');

async function getAllUsers() {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllUsers,
};