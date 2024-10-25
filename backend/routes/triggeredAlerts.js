const express = require('express');
const { getTriggeredAlerts } = require('../models/triggeredalerts');
const { handleDeleteTriggeredAlert } = require('../controllers/triggeredAlertController');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const alerts = await getTriggeredAlerts();
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a triggered alert by ID
router.delete('/:id', handleDeleteTriggeredAlert); // Use the imported handler

module.exports = router;
