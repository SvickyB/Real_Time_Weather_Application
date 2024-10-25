const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weather');
const alertRoutes = require('./routes/alert');
const pool = require('./db/config');
const fs = require('fs');
const path = require('path');
const { checkAlerts } = require('./controllers/alertController');
const { createWeatherTable } = require('./models/weather');
const triggeredAlertsRoutes = require('./routes/triggeredAlerts');
dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// API routes
app.use('/api/weather', weatherRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/triggered-alerts', triggeredAlertsRoutes)

// Function to initialize database tables from init.sql
const createTables = async () => {
    try {
        const sql = fs.readFileSync(path.join(__dirname, '..', 'database', 'init.sql')).toString();
        await pool.query(sql);
        console.log('Database tables created successfully or already exist.');
    } catch (error) {
        console.error('Error creating database tables:', error);
        process.exit(1); // Exit the process on error
    }
};

// Start the server
const startServer = async () => {
    try {
        // Connect to the database
        await pool.connect();
        console.log('Database connected successfully');

        // Create tables if needed
        await createTables();

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);

            // Initial alert check when the server starts
            console.log('Performing initial alert check...');
            checkAlerts().catch(console.error); // Log errors if any

            // Check alerts every 10 minutes
            setInterval(checkAlerts, 60000 * 10);

            // Fetch weather data every 5 minutes
            setInterval(async () => {
                try {
                    console.log('Fetching weather data...');
                    await createWeatherTable();
                    console.log('Weather data updated successfully');
                } catch (error) {
                    console.error('Error updating weather data:', error);
                }
            }, 300000);
        });
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process on connection error
    }
};

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
});

// Start the server
startServer();
