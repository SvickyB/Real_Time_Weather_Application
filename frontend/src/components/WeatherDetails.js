import React from 'react';
import { Droplets, Wind, Sun, Thermometer } from 'lucide-react';

const WeatherDetails = ({ currentWeather, tempUnit }) => {
    const { humidity, wind_speed, min_temperature, max_temperature, feels_like } = currentWeather;

    const formatTemperature = (temp) => {
        switch (tempUnit) {
            case 'C':
                return `${temp.toFixed(1)}°C`;
            case 'K':
                return `${(temp + 273.15).toFixed(1)}K`;
            case 'F':
                return `${(temp * 9/5 + 32).toFixed(1)}°F`;
            default:
                return `${temp.toFixed(1)}°C`;
        }
    };

    return (
        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Weather Details</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <Droplets className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-white">Humidity: {humidity}%</span>
                </div>
                <div className="flex items-center">
                    <Wind className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-white">Wind Speed: {wind_speed} km/h</span>
                </div>
                <div className="flex items-center">
                    <Sun className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-white">Min Temp: {formatTemperature(min_temperature)}</span>
                </div>
                <div className="flex items-center">
                    <Sun className="w-5 h-5 text-red-400 mr-2" />
                    <span className="text-white">Max Temp: {formatTemperature(max_temperature)}</span>
                </div>
                <div className="flex items-center">
                    <Thermometer className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-white">Feels Like: {formatTemperature(feels_like)}</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherDetails;
