import React, { useState } from "react";
import styles from "./weather.module.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "440cadb1a012a62858556aaff5c56c47";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  const getWeather = async () => {
    try {
      const response = await fetch(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=imperial`
      );

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeather();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{weatherData.name}</p>
            </div>
            <div className="temp">
              {weatherData.main ? <h1>{weatherData.main.temp}°F</h1> : null}
            </div>
            <div className="description">
              {weatherData.weather ? (
                <p>{weatherData.weather[0].main}</p>
              ) : null}
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              {weatherData.main ? (
                <p className="bold">{weatherData.main.feels_like}°F</p>
              ) : null}
            </div>
            <div className="humidity">
              {weatherData.main ? (
                <p className="bold">{weatherData.main.humidity}%</p>
              ) : null}
            </div>
            <div className="wind">
              {weatherData.wind ? (
                <>
                  <p className="bold">{weatherData.wind.speed}MPH</p>
                  <p>Wind Speed</p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
