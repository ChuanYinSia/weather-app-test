import React, { useState } from "react";
// sections
import WeatherSearchComponent from "../sections/WeatherSearchComponent";
import WeatherResultComponent from "../sections/WeatherResultComponent";
// utils
import axios from "../utils/axios";

export default function Weather() {
  const [weather, setWeather] = useState([]);
  const [country, setCountry] = useState("");
  const [error, setError] = useState(null);

  const APIKEY = "ac89e9dd882789fdd1d328a3af56b8e2";

  async function handleGetWeatherData(countryData) {
    if (countryData === "") {
      alert("Please Enter Country");
    } else {
      try {
        setError(null);
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryData},${countryData}&APPID=${APIKEY}`);

        setWeather([response.data, ...weather]);
      } catch (error) {
        setError(error);
      }
    }
  }

  const handleSetCountry = (data) => {
    setCountry(data);
  };

  const handleDelete = (index) => {
    const newItems = weather.filter((_, i) => i !== index);
    setWeather(newItems);
  };

  const currentSearch = weather[0] || null;

  return (
    <div className="App">
      <WeatherSearchComponent country={country} handleSetCountry={handleSetCountry} handleGetWeatherData={handleGetWeatherData} />
      {error && <div className="errorMessage">{error.message}</div>}
      {currentSearch && <WeatherResultComponent currentSearch={currentSearch} weather={weather} handleDelete={handleDelete} handleGetWeatherData={handleGetWeatherData} />}
    </div>
  );
}
