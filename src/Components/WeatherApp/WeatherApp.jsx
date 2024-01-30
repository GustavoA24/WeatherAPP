import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  let api_key = "cecba9016b2a353231d5e859c2295ddb";

  const [wicon, setWicon] = useState(cloud_icon); // Estado para el ícono del clima

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element.length === 0 || element[0].value === "") {
      return;
    }

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=imperial&appid=${api_key}`;

      let response = await fetch(url);
      let data = await response.json();

      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      if (humidity.length > 0) {
        humidity[0].innerHTML = data.main.humidity + "%";
      }

      if (wind.length > 0) {
        wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
      }

      if (temperature.length > 0) {
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°F";
      }

      if (location.length > 0) {
        location[0].innerHTML = data.name;
      }

      if (data.weather[0].icon.startsWith("01")) {
        setWicon(clear_icon);
      } else if (data.weather[0].icon.startsWith("02")) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon.startsWith("03") ||
        data.weather[0].icon.startsWith("04")
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon.startsWith("09") ||
        data.weather[0].icon.startsWith("10")
      ) {
        setWicon(rain_icon);
      } else if (data.weather[0].icon.startsWith("13")) {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <div className="text">Gustavo A. Cortes Medina</div>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="Cloud" />
      </div>
      <div className="weather-temp"> 80°F</div>
      <div className="weather-location">Aguada</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">86%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">13 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
