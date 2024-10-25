const pool = require('../db/config');

// Insert a new user alert
const createUserAlert = async (data) => {
    const query = `
        INSERT INTO user_alerts (city, temperature, condition, email)
        VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const result = await pool.query(query, [data.city, data.temperature, data.condition, data.email]);
    return result.rows[0];
};

// Delete a user alert
const deleteUserAlert = async (id) => {
    const query = 'DELETE FROM user_alerts WHERE id = $1;';
    await pool.query(query, [id]);
};

// Get all user alerts
const getUserAlerts = async () => {
    const query = 'SELECT * FROM user_alerts;';
    const result = await pool.query(query);
    return result.rows;
};

module.exports = {
    createUserAlert,
    deleteUserAlert,
    getUserAlerts,
};
