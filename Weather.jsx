import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faCloudRain, faSnowflake, faSmog, faBolt } from '@fortawesome/free-solid-svg-icons';
import '../css/Weather.css';

const Weather = () => {
    const [data, setData] = useState(null);
    const [query, setQuery] = useState('');
    const [city, setCity] = useState('');
    const apiKey = "0f3f4a4c95b426203372ebf7c31afd2f";

    useEffect(() => {
        if (city) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [city, apiKey]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(query);
        console.log(query);
    };

    const getWeatherIcon = (weather) => {
        switch (weather) {
            case 'Clear':
                return <FontAwesomeIcon icon={faSun} />;
            case 'Clouds':
                return <FontAwesomeIcon icon={faCloud} />;
            case 'Rain':
                return <FontAwesomeIcon icon={faCloudRain} />;
            case 'Snow':
                return <FontAwesomeIcon icon={faSnowflake} />;
            case 'Mist':
            case 'Smoke':
            case 'Haze':
            case 'Dust':
            case 'Fog':
            case 'Sand':
            case 'Ash':
            case 'Squall':
            case 'Tornado':
                return <FontAwesomeIcon icon={faSmog} />;
            case 'Thunderstorm':
                return <FontAwesomeIcon icon={faBolt} />;
            default:
                return <FontAwesomeIcon icon={faCloud} />;
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: 100 }} className="weather-app">
            <h3>Weather App</h3>
            <form style={{ backgroundColor: 'red' }} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter city name"
                />
                <button type="submit">Search</button>
            </form>
            {data ? (
                <div>
                    <div style={{padding:40,marginTop:40,marginBottom:40}}> <h1>{getWeatherIcon(data.weather[0].main)}</h1></div>
                    <h4>Humidity: {data.main.humidity}%</h4>
                    <p>Location: {data.name}</p>
                    <p>Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</p>
                    <p>Feels Like: {(data.main.feels_like - 273.15).toFixed(2)}°C</p>
                    <p>Min Temperature: {(data.main.temp_min - 273.15).toFixed(2)}°C</p>
                    <p>Max Temperature: {(data.main.temp_max - 273.15).toFixed(2)}°C</p>
                    <p>Weather: {data.weather[0].description}</p>
                  
                    <p>Wind Speed: {data.wind.speed} m/s</p>
                    <p>Wind Direction: {data.wind.deg}°</p>
                    <p>Wind Gust: {data.wind.gust} m/s</p>
                    <p>Cloudiness: {data.clouds.all}%</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Weather;
