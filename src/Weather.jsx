import React, { useState } from "react";
import axios from "axios";
import styles from "./weather.module.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");

  const apiKey = "440cadb1a012a62858556aaff5c56c47";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      });

      const { main, weather: weatherInfo } = response.data;
      setTemperature(main.temp);
      setWeather(weatherInfo[0].description);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <h1>Weather App</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {temperature && weather && (
        <div className={styles.resultContainer}>
          <p>Temperature: {temperature}°C</p>
          <p>Weather: {weather}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
