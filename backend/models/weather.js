const pool = require('../db/config');

const createWeatherTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS weather (
        id SERIAL PRIMARY KEY,
        city VARCHAR(50),
        temperature FLOAT,
        wind_speed FLOAT,
        humidity FLOAT,
        description VARCHAR(100),
        min_temperature FLOAT,
        max_temperature FLOAT,
        feels_like FLOAT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    await pool.query(query);
};

const getWeatherData = async (city) => {
    const query = 'SELECT * FROM weather WHERE city = $1 ORDER BY created_at DESC LIMIT 5;';
    const result = await pool.query(query, [city]);
    return result.rows;
};

const insertWeatherData = async (data) => {
    const query = `
        INSERT INTO weather (city, temperature, wind_speed, humidity, description, min_temperature, max_temperature, feels_like)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    
    await pool.query(query, [
        data.city,
        data.temperature,
        data.wind_speed,
        data.humidity,
        data.description,
        data.min_temperature,
        data.max_temperature,
        data.feels_like,
    ]);

    // Delete older records if there are more than 100
    const deleteQuery = `
        DELETE FROM weather
        WHERE city = $1
        AND id NOT IN (
            SELECT id FROM weather
            WHERE city = $1
            ORDER BY created_at DESC
            LIMIT 100
        );
    `;
    await pool.query(deleteQuery, [data.city]);
};

module.exports = { createWeatherTable, getWeatherData, insertWeatherData };
