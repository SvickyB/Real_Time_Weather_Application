const express = require('express');
const { getWeather } = require('../controllers/weatherController'); // Adjust the path based on your structure

const router = express.Router();

router.get('/:city', getWeather);

module.exports = router;
