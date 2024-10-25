import React from 'react';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const CurrentWeather = ({ currentWeather, tempUnit }) => {
    const { description, temperature, city } = currentWeather;

    let weatherImage;

switch (description.toLowerCase()) {
    case 'clear':
    case 'clear sky':
        weatherImage = 'https://c0.wallpaperflare.com/preview/913/700/937/sky-clouds-blue-skies.jpg';
        break;
    case 'few clouds':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7DU4g-LDnJTkv6iyNQGm3VLiBrwGoTYbL8w&s'; // Adjust as needed
        break;
    case 'scattered clouds':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7DU4g-LDnJTkv6iyNQGm3VLiBrwGoTYbL8w&s'; // Adjust as needed
        break;
    case 'broken clouds':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7DU4g-LDnJTkv6iyNQGm3VLiBrwGoTYbL8w&s'; // Adjust as needed
        break;
    case 'overcast clouds':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7DU4g-LDnJTkv6iyNQGm3VLiBrwGoTYbL8w&s'; // Adjust as needed
        break;
    case 'shower rain':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlYK6E--Hv3IvVmgh85xLWhmv0I8tm8JxhQ&s';
        break;
    case 'heavy intensity rain':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlYK6E--Hv3IvVmgh85xLWhmv0I8tm8JxhQ&s';
        break;
    case 'rain':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlYK6E--Hv3IvVmgh85xLWhmv0I8tm8JxhQ&s';
        break;
    case 'thunderstorm':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlYK6E--Hv3IvVmgh85xLWhmv0I8tm8JxhQ&s'; // Adjust as needed
        break;
    case 'snow':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPNDELpXqGqgefo3p1NGOfF9mKno4JZKoupjlNAdLzeb2CoszVaEFI8OB60m6bqDCq5c4&s';
        break;
    case 'mist':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpwcwjIb6oq_ui1tuZpSxsUk5mPVojbho0g&s'; // Adjust as needed
        break;
    case 'smoke':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpwcwjIb6oq_ui1tuZpSxsUk5mPVojbho0g&s'; // Adjust as needed
        break;
    case 'haze':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpwcwjIb6oq_ui1tuZpSxsUk5mPVojbho0g&s'; // Adjust as needed
        break;
    case 'dust':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpwcwjIb6oq_ui1tuZpSxsUk5mPVojbho0g&s'; // Adjust as needed
        break;
    case 'fog':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpwcwjIb6oq_ui1tuZpSxsUk5mPVojbho0g&s'; // Adjust as needed
        break;
    case 'sand':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpwcwjIb6oq_ui1tuZpSxsUk5mPVojbho0g&s'; // Adjust as needed
        break;
    case 'ash':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpwcwjIb6oq_ui1tuZpSxsUk5mPVojbho0g&s'; // Adjust as needed
        break;
    case 'squall':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpwcwjIb6oq_ui1tuZpSxsUk5mPVojbho0g&s'; // Adjust as needed
        break;
    case 'tornado':
        weatherImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpwcwjIb6oq_ui1tuZpSxsUk5mPVojbho0g&s'; // Adjust as needed
        break;
    default:
        weatherImage = 'https://c0.wallpaperflare.com/preview/913/700/937/sky-clouds-blue-skies.jpg'; // Default image
}


    const now = new Date();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <div
            className="relative p-8 rounded-lg bg-cover"
            style={{ backgroundImage: `url(${weatherImage})` }}
        >
            <h2 className="text-2xl font-bold text-black">{capitalizeFirstLetter(city)}</h2>
            <p className="text-gray-700 capitalize">{capitalizeFirstLetter(description)}</p>
            <div className="absolute bottom-4 right-4 text-white">
                <p className="text-lg text-gray-800">
                    {temperature.toFixed(1)}°{tempUnit} {/* Displaying temperature unit dynamically */}
                </p>
                <p className="text-gray-800">{currentDay}</p>
                <p className="text-gray-800">{currentTime}</p>
            </div>
        </div>
    );
};

export default CurrentWeather;
