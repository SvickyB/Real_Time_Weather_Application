import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Bell, Search } from 'lucide-react';
import CurrentWeather from './CurrentWeather';
import WeatherDetails from './WeatherDetails';
import Forecast from './Forecast';

const initialCities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const Weather = () => {
    const navigate = useNavigate();
    const [citiesWeather, setCitiesWeather] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchCity, setSearchCity] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState('');
    const [tempUnit, setTempUnit] = useState('C');

    const fetchWeatherData = async (city) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching weather data for ${city}:`, error);
            throw error; // Rethrow to handle in calling function
        }
    };

    const fetchInitialWeatherData = useCallback(async () => {
        setIsLoading(true);
        setError('');

        try {
            const weatherData = await Promise.all(initialCities.map(fetchWeatherData));
            const validWeatherData = weatherData.filter(data => data && data.current);
            setCitiesWeather(validWeatherData.map(data => data.current));

            if (validWeatherData.length > 0) {
                setForecast(validWeatherData[0].forecast);
            }
        } catch (error) {
            setError('Failed to load initial weather data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInitialWeatherData();
    }, [fetchInitialWeatherData]);

    const handleCityChange = async (index) => {
        setError('');
        setCurrentIndex(index);
        const city = citiesWeather[index]?.city || initialCities[index];

        try {
            const data = await fetchWeatherData(city);
            setCitiesWeather(prev => [
                ...prev.slice(0, index),
                data.current,
                ...prev.slice(index + 1),
            ]);
            setForecast(data.forecast);
        } catch (error) {
            setError(`Error fetching data for ${city}`);
        }
    };

    const handleSearch = async () => {
        if (!searchCity.trim()) {
            setError('Please enter a city name');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const data = await fetchWeatherData(searchCity);
            setCitiesWeather(prev => [...prev, data.current]);
            setCurrentIndex(citiesWeather.length);
            setForecast(data.forecast);
        } catch (error) {
            setError(`City "${searchCity}" not found. Please check the spelling and try again.`);
        } finally {
            setIsLoading(false);
            setSearchCity('');
        }
    };

    const convertTemperature = (temp, unit) => {
        switch (unit) {
            case 'C':
                return temp;
            case 'K':
                return temp + 273.15;
            case 'F':
                return (temp * 9) / 5 + 32;
            default:
                return temp;
        }
    };

    const currentWeather = citiesWeather[currentIndex] || {};
    const currentTemperature = convertTemperature(currentWeather.temperature, tempUnit);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 w-full h-full">
            <div className="backdrop-blur-md bg-black/10 shadow-lg border-b border-white/10">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center px-6 py-4">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                            Weather App
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={searchCity}
                                    onChange={(e) => setSearchCity(e.target.value)}
                                    placeholder="Search city..."
                                    className="px-4 py-2 w-64 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="absolute right-1 top-1 p-1.5 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                                >
                                    <Search className="w-4 h-4 text-white" />
                                </button>
                            </div>
                            <button
                                onClick={() => navigate('/alerts')}
                                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
                            >
                                <Bell className="w-6 h-6 text-white/80 hover:text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-8">
                <div className="flex gap-4 flex-wrap justify-center">
                    {initialCities.map((city, index) => (
                        <button
                            key={index}
                            onClick={() => handleCityChange(index)}
                            className={`px-6 py-2 rounded-full text-white transition-all duration-300 transform hover:scale-105 ${
                                currentIndex === index
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20'
                                    : 'bg-white/10 hover:bg-white/20'
                            }`}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                {/* Change Temperature Unit Button */}
                <div className="mt-4">
                    <button
                        onClick={() => {
                            setTempUnit(prevUnit => {
                                if (prevUnit === 'C') return 'K';
                                if (prevUnit === 'K') return 'F';
                                return 'C';
                            });
                        }}
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Change to {tempUnit === 'C' ? 'Kelvin' : tempUnit === 'K' ? 'Fahrenheit' : 'Celsius'}
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-8 pb-8">
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            <p className="text-red-200">{error}</p>
                        </div>
                    </div>
                ) : currentWeather.city ? (
                    <div className="grid md:grid-cols-2 gap-8">
                        <CurrentWeather currentWeather={{ ...currentWeather, temperature: currentTemperature }} tempUnit={tempUnit} />
                        <div className="space-y-6">
                            <WeatherDetails currentWeather={currentWeather} tempUnit={tempUnit} />
                            <Forecast forecast={forecast} tempUnit={tempUnit} />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Weather;
