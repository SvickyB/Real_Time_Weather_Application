const express = require('express');
const cors = require('cors');
const {
    createUserAlert,
    getUserAlerts,
    deleteUserAlert,
} = require('../models/alerts');
const router = express.Router();

// Middleware
router.use(cors({
    origin: 'http://localhost:3000', // Adjust to your frontend's URL
}));

// Other routes...
router.post('/', async (req, res) => {
    try {
        const alert = await createUserAlert(req.body);
        res.status(201).json(alert);
    } catch (error) {
        console.error('Error creating user alert:', error);
        res.status(500).json({ error: 'Failed to create alert' });
    }
});

router.get('/', async (req, res) => {
    try {
        const alerts = await getUserAlerts();
        res.status(200).json(alerts);
    } catch (error) {
        console.error('Error fetching user alerts:', error);
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await deleteUserAlert(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting user alert:', error);
        res.status(500).json({ error: 'Failed to delete alert' });
    }
});

module.exports = router;
