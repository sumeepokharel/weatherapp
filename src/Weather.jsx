import React, { useState } from "react";
import styles from "./App.module.css";

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
    <div className={styles.weatherContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Get Weather
        </button>
      </form>

      {weatherData && (
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.location}>
              <p>{weatherData.name}</p>
            </div>
            <div className={styles.temp}>
              {weatherData.main ? <h1>{weatherData.main.temp}°F</h1> : null}
            </div>
            <div className={styles.description}>
              {weatherData.weather ? (
                <p>{weatherData.weather[0].main}</p>
              ) : null}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.feels}>
              {weatherData.main ? (
                <p className={styles.bold}>{weatherData.main.feels_like}°F</p>
              ) : null}
            </div>
            <div className={styles.humidity}>
              {weatherData.main ? (
                <p className={styles.bold}>{weatherData.main.humidity}%</p>
              ) : null}
            </div>
            <div className={styles.wind}>
              {weatherData.wind ? (
                <>
                  <p className={styles.bold}>{weatherData.wind.speed}MPH</p>
                  <p>Wind Speed</p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
