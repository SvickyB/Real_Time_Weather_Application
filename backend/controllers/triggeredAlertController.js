const { getTriggeredAlerts, deleteTriggeredAlert } = require('../models/triggeredalerts');

const handleDeleteTriggeredAlert = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAlert = await deleteTriggeredAlert(id);
        res.status(200).json({ message: 'Alert deleted successfully', alert: deletedAlert });
    } catch (error) {
        console.error('Error deleting alert:', error); // Log the error for debugging
        res.status(404).json({ error: error.message }); // Return 404 if alert not found
    }
};

module.exports = { handleDeleteTriggeredAlert };
