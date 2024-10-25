const axios = require('axios');
const { insertWeatherData } = require('../models/weather');
const moment = require('moment');

const API_KEY = process.env.WEATHER_API_KEY; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to fetch current weather data
const getWeatherData = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);

        return [{
            city: city,
            temperature: response.data.main.temp,
            wind_speed: response.data.wind.speed,
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
            min_temperature: response.data.main.temp_min,
            max_temperature: response.data.main.temp_max,
            feels_like: response.data.main.feels_like,
            datetime: moment().format('YYYY-MM-DD HH:mm:ss'), 
            day: moment().format('dddd'), 
        }];
    } catch (error) {
        console.error('Error fetching current weather data:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// Function to fetch and respond with current weather and forecast data
const getWeather = async (req, res) => {
    const city = req.params.city;

    try {
        const currentWeatherData = await getWeatherData(city);
        await insertWeatherData(currentWeatherData[0]); // Assuming insertWeatherData accepts a single object

        // Fetch forecast data
        const forecastResponse = await axios.get(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`);

        const forecastData = forecastResponse.data.list
            .map(item => ({
                datetime: moment(item.dt_txt).format('YYYY-MM-DD'),
                temperature: item.main.temp,
                description: item.weather[0].description,
            }))
            .filter((item, index, self) =>
                index === self.findIndex(f => f.datetime === item.datetime)
            )
            .slice(0, 5);

        res.json({ current: currentWeatherData[0], forecast: forecastData });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(500).json({ error: 'Error fetching weather data' });
    }
};

module.exports = {
    getWeather,
    getWeatherData, // Ensure to export this function
};
