import React, { useState } from "react";
import axios from "axios";
import search from "./assets/search.png";
import clear from "./assets/clear.png";
import cloudsDay from "./assets/clouds-day.png";
import drizzle from "./assets/drizzle.png";
import humidity from "./assets/humidity.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import wind from "./assets/wind.png";
import mist from "./assets/mist.png";
import starMoon from "./assets/star-moon.png";
import cloudsNight from "./assets/clouds-night.png";
import clearMoon from "./assets/clear-moon.png";
import bijli from "./assets/lightning.png";
import "./App.css";

// const rapidApiKey = process.env.WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");

  const options = {
    method: "GET",
    url: "https://open-weather13.p.rapidapi.com/city/" + city,
    headers: {
      "X-RapidAPI-Key": "d4cd6fdee9msh45c03025bfbd61bp1b25e9jsn5cf65e0a2276",
      "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    },
  };

  const [data, setData] = useState({
    name: "",
    main: { temp: 0, humidity: 0 },
    wind: { speed: 0 },
    weather: [{ main: "" }],
  });

  const fahrenheitToCelsius = (fahrenheit) => {
    // Convert Fahrenheit to Celsius using the formula: (Fahrenheit - 32) * 5/9
    const celsius = (fahrenheit - 32) * (5 / 9);
    return celsius;
  };

  const searchWeather = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const currentTimestamp = Date.now();
  let sunriseTimestamp = 0;
  let sunsetTimestamp = 0;
  if (data.sys && data.sys.sunrise) {
    sunriseTimestamp = data.sys.sunrise;
  } else {
    console.error("Sunrise data not found in JSON.");
  }
  if (data.sys && data.sys.sunset) {
    sunsetTimestamp = data.sys.sunset;
  } else {
    console.error("Sunset data not found in JSON.");
  }
  console.log(sunriseTimestamp);
  console.log(sunsetTimestamp);

  const isDaytime = () => {
    // Convert timestamps to milliseconds
    const currentMillis = currentTimestamp * 1000;
    const sunriseMillis = sunriseTimestamp * 1000;
    const sunsetMillis = sunsetTimestamp * 1000;

    // Create Date objects for the current time, sunrise, and sunset
    const currentDate = new Date(currentMillis);
    const sunriseDate = new Date(sunriseMillis);
    const sunsetDate = new Date(sunsetMillis);

    // Compare the current time with sunrise and sunset
    if (currentDate >= sunriseDate && currentDate <= sunsetDate) {
      console.log("day");
      return true; // It's daytime
    } else {
      console.log("night")
      return false; // It's nighttime
    }
  };
  let weatherImage = clear;
  // console.log(data.weather[0]?.description);
  // console.log(isDaytime);

  if (isDaytime) {
    if (data.weather[0].description === "haze") weatherImage = mist;
    else if (data.weather[0]?.description?.includes("clouds"))
      weatherImage = cloudsDay;
    else if (data.weather[0]?.description?.includes("rain"))
      weatherImage = rain;
    else if (data.weather[0]?.description?.includes("drizzle"))
      weatherImage = drizzle;
  } else {
    weatherImage = clearMoon;
    if (data.weather[0].description === "haze") weatherImage = starMoon;
    else if (data.weather[0]?.description?.includes("clouds"))
      weatherImage = cloudsNight;
    else if (data.weather[0]?.description?.includes("rain"))
      weatherImage = rain;
    else if (data.weather[0]?.description?.includes("drizzle"))
      weatherImage = drizzle;
  }

  if (data.weather[0]?.description?.includes("snow")) weatherImage = snow;
  else if (data.weather[0]?.description?.includes("lightning"))
    weatherImage = bijli;

  return (
    <div className="App">
      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            spellCheck="false"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={searchWeather}>
            <img
              src={search}
              className="bx bx-search-alt-2"
              alt="serach-icon"
            ></img>
          </button>
        </div>
        {data.name && (
          <div className="weather">
            <div className="main">
              <img src={weatherImage} alt="" className="weather-icon" />
              <h1 className="temp">
                {Math.round(fahrenheitToCelsius(data.main.temp))}°c
              </h1>
              <h2 className="city">{data.name}</h2>
            </div>

            <div className="details">
              <div className="col">
                <img src={humidity} alt="" />
              </div>
              <p className="humidity">{data.main.humidity} %</p>
              <p>Humidity</p>
            </div>
            <div className="details">
              <div className="col">
                <img src={wind} alt="" />
              </div>
              <p className="wind">{data.wind.speed} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
