import axios from 'axios';
import { useEffect, useState } from 'react';
import Search from './Search'; // Ensure you have a Search component
import './Weather.css';

function Weather() {
    const [weatherData, setWeatherData] = useState(null); // Initialize as null
    const [location, setLocation] = useState('London'); // Default location

    async function downloadApi(city) {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_KEY}&q=${city}`);
        console.log(response.data);
        setWeatherData(response.data); // Set the fetched data
    }

    // This effect runs when the component mounts and fetches data for the default location
    useEffect(() => {
        downloadApi(location); // Fetch weather data for the initial location
    }, []); // Empty dependency array ensures this runs only once

    // This effect runs every time the location changes
    useEffect(() => {
        if (location) {
            downloadApi(location); // Fetch weather data for the new location
        }
    }, [location]);

    const handleSearch = (city) => {
        setLocation(city); // Update location when the user searches for a new city
    };

    // Add a loading state
    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="weather-container">
            <Search onSearch={handleSearch} /> {/* Pass the handleSearch function to the Search component */}
            <h1>Weather in {weatherData.location.name}</h1>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Condition: {weatherData.current.condition.text}</p>
            {/* Add weather icon */}
            <img
    src={weatherData.current.condition.icon}
    alt={weatherData.current.condition.text}
    className="weather-icon interactive"
    onClick={() => alert(`You clicked on the weather icon for ${weatherData.current.condition.text}`)} // Example action
/>


        </div>
    );
}

export default Weather;
