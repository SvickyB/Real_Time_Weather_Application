const pool = require('../db/config');
const { getWeatherData } = require('./weatherController');
const { sendAlertEmail } = require('./notification');

// Check alerts against current weather and insert into alert table
const checkAlerts = async () => {
    try {
        const userAlertsQuery = 'SELECT * FROM user_alerts;';
        const userAlerts = await pool.query(userAlertsQuery);

        console.log(`Checking ${userAlerts.rows.length} alerts...`);

        for (const alert of userAlerts.rows) {
            const weatherData = await getWeatherData(alert.city);

            if (weatherData && weatherData.length > 0) {
                const currentWeather = weatherData[0];

                const tempConditionMet = alert.temperature && 
                    currentWeather.temperature >= alert.temperature;
                const conditionMet = alert.condition && 
                    currentWeather.description.toLowerCase().includes(alert.condition.toLowerCase());

                console.log(`Checking alert for ${alert.city}:`, {
                    currentTemp: currentWeather.temperature,
                    targetTemp: alert.temperature,
                    currentCondition: currentWeather.description,
                    targetCondition: alert.condition,
                    tempMet: tempConditionMet,
                    conditionMet: conditionMet,
                    email: alert.email
                });

                // If conditions are met, log the email and insert alert
                if (tempConditionMet || conditionMet) {
                    console.log(`Alert condition met for ${alert.city} (Email: ${alert.email})`);

                    const insertQuery = `
                        INSERT INTO alerts (user_alert_id, city, temperature, condition, email)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING *;
                    `;

                    const insertResult = await pool.query(insertQuery, [
                        alert.id,
                        alert.city,
                        currentWeather.temperature,
                        currentWeather.description,
                        alert.email // Include email from user_alerts
                    ]);

                    console.log('Alert inserted:', insertResult.rows[0]);
                    
                    await sendAlertEmail(alert.email, alert.city, currentWeather.temperature, currentWeather.description);
                }
            }
        }
        console.log('Alert check completed.');
    } catch (error) {
        console.error('Error checking alerts:', error);
    }
};

module.exports = { checkAlerts };
