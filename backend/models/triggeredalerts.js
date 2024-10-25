const pool = require('../db/config');

// Function to get all triggered alerts
const getTriggeredAlerts = async () => {
    const res = await pool.query('SELECT * FROM alerts');
    return res.rows;
};

// Function to delete a triggered alert by ID
const deleteTriggeredAlert = async (id) => {
    const res = await pool.query('DELETE FROM alerts WHERE id = $1 RETURNING *', [id]);
    if (res.rowCount === 0) {
        throw new Error(`Alert with ID ${id} not found`);
    }
    return res.rows[0]; // Return the deleted alert
};

module.exports = { getTriggeredAlerts, deleteTriggeredAlert };
