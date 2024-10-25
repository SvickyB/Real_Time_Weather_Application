import React from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';

// Define a mapping of weather conditions to their corresponding icons
const weatherIcons = {
    clear: <Sun className="w-6 h-6 text-yellow-400" />,
    cloudy: <Cloud className="w-6 h-6 text-gray-400" />,
    rain: <CloudRain className="w-6 h-6 text-blue-400" />,
};

// Function to get the next five days
const getNextFiveDays = () => {
    const today = new Date();
    return Array.from({ length: 5 }, (_, i) => {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        return nextDay.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Monday"
    });
};

// Function to convert temperature based on unit
const convertTemperature = (temp, unit) => {
    switch (unit) {
        case 'C':
            return temp;
        case 'K':
            return temp + 273.15;
        case 'F':
            return (temp * 9 / 5) + 32;
        default:
            return temp;
    }
};

const Forecast = ({ forecast, tempUnit }) => {
    const days = getNextFiveDays();

    return (
        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-5 gap-2">
                {days.map((day, index) => {
                    // Get the appropriate weather data for the current day
                    const weatherData = forecast[index] || {};
                    const weatherDescription = weatherData.description ? weatherData.description.toLowerCase() : 'clear'; // Fallback to clear

                    // Select the appropriate weather icon
                    let weatherIcon;
                    if (weatherDescription.includes('rain')) {
                        weatherIcon = weatherIcons.rain;
                    } else if (weatherDescription.includes('cloud')) {
                        weatherIcon = weatherIcons.cloudy;
                    } else {
                        weatherIcon = weatherIcons.clear;
                    }

                    const currentTemp = weatherData.temperature !== undefined
                        ? convertTemperature(weatherData.temperature, tempUnit).toFixed(1)
                        : '--.-';

                    return (
                        <div key={index} className="flex flex-col items-center">
                            <span className="text-white/60 text-sm">{day}</span>
                            {weatherIcon}
                            <span className="text-white font-medium mt-1">
                                {currentTemp}°{tempUnit} {/* Displaying the temperature unit dynamically */}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Forecast;
