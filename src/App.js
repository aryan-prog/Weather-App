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
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: {q: city},
  headers: {
    'X-RapidAPI-Key': 'd4cd6fdee9msh45c03025bfbd61bp1b25e9jsn5cf65e0a2276',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  },
  };

  const [data, setData] = useState({
    name: "",
    main: { temp: 0, humidity: 0 },
    wind: { speed: 0 },
    weather: [{ main: "" }],
  });

  const searchWeather = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let weatherImage = clear;

  if (data?.current?.is_day) {
    if (data?.current?.condition?.text === "mist") weatherImage = mist;
    else if (data?.current?.condition?.text.includes("clouds"))
      weatherImage = cloudsDay;
    else if (data?.current?.condition?.text.includes("rain"))
      weatherImage = rain;
    else if (data?.current?.condition?.text.includes("drizzle"))
      weatherImage = drizzle;
  } else {
    weatherImage = clearMoon;
    if (data?.current?.condition?.text === "mist") weatherImage = starMoon;
    else if (data?.current?.condition?.text.includes("clouds"))
      weatherImage = cloudsNight;
    else if (data?.current?.condition?.text.includes("rain"))
      weatherImage = rain;
    else if (data?.current?.condition?.text.includes("drizzle"))
      weatherImage = drizzle;
  }

  if (data?.current?.condition?.text.includes("snow")) 
  weatherImage = snow;
  else if (data?.current?.condition?.text.includes("lightning"))
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
        {data.location?.name && (
          <div className="weather">
            <div className="main">
              <img src={weatherImage} alt="" className="weather-icon" />
              <h1 className="temp">
                {data?.current?.temp_c}°c
              </h1>
              <h2 className="city">{data?.location?.name}, {data?.location?.country}</h2>
            </div>

            <div className="details">
              <div className="col">
                <img src={humidity} alt="" />
              </div>
              <p className="humidity">{data?.current?.humidity} %</p>
              <p>Humidity</p>
            </div>
            <div className="details">
              <div className="col">
                <img src={wind} alt="" />
              </div>
              <p className="wind">{data?.current?.wind_kph} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
