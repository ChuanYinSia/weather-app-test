import React, { useLayoutEffect, useState } from "react";

import PropTypes from "prop-types";
import Iconify from "../components/iconify";
import { fDateTime } from "../utils/formatTime";
import { fKelvinToCelsius } from "../utils/formatTemperature";

import cloudLogo from "../assets/cloud.png";
import sunLogo from "../assets/sun.png";
// ----------------------------------------------------------------------

WeatherResultComponent.propTypes = {
  currentSearch: PropTypes.object,
  weather: PropTypes.array,
  handleDelete: PropTypes.func,
  handleGetWeatherData: PropTypes.func,
};

export default function WeatherResultComponent({ currentSearch, weather, handleDelete, handleGetWeatherData }) {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const isMobile = size[0] < 767;

  return (
    <div className="weatherCard">
      <div className="mainWeatherInfo">
        <div className="weatherTemperature">
          <p>Today's Weather</p>
          <h1 className="mainTemperature">{fKelvinToCelsius(currentSearch.main.temp)}</h1>
          <p>
            H: {fKelvinToCelsius(currentSearch.main.temp_max)} L:{fKelvinToCelsius(currentSearch.main.temp_min)}
          </p>
          {isMobile && (
            <div className="weatherDetailsItem">
              <p>{`${currentSearch.name}, ${currentSearch.sys?.country}`}</p>
            </div>
          )}
        </div>

        <div className="weatherIconCard">
          <div className="weatherIcon">
            <img src={currentSearch.weather[0]?.main === "Clear" ? sunLogo : cloudLogo} className="weatherIconLogo" alt="weatherLogo" />
          </div>

          {isMobile && (
            <div>
              <div className="weatherDetailsItem">
                <p style={{ textAlign: "end" }}>{currentSearch.weather[0]?.main || ""}</p>
              </div>
              <div className="weatherDetailsItem">
                <p style={{ textAlign: "end" }}>Humidity: {`${currentSearch.main.humidity}%`}</p>
              </div>
              <div className="weatherDetailsItem">
                <p style={{ textAlign: "end" }}>{fDateTime(currentSearch.dt * 1000)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isMobile ? (
        <div className="weatherDetails">
          <div className="weatherDetailsItem">
            <p>{`${currentSearch.name}, ${currentSearch.sys?.country}`}</p>
          </div>
          <div className="weatherDetailsItem">
            <p style={{ textAlign: "end" }}>{fDateTime(currentSearch.dt * 1000)}</p>
          </div>
          <div className="weatherDetailsItem">
            <p style={{ textAlign: "end" }}>Humidity: {`${currentSearch.main.humidity}%`}</p>
          </div>
          <div className="weatherDetailsItem">
            <p style={{ textAlign: "end" }}>{currentSearch.weather[0]?.main || ""}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="weatherHistoryCard">
        <p>Search History</p>
        {weather.map((item, i) =>
          isMobile ? (
            <div className="weatherHistoryCardItem" key={i}>
              <div>
                <div>{`${item.name}, ${item.sys?.country}`}</div>
                <div className="weatherHistoryCardItemDate">{fDateTime(item.dt * 1000)}</div>
              </div>
              <div className="weatherHistoryCardItemOption">
                <button onClick={() => handleGetWeatherData(item.name)}>
                  <Iconify icon="eva:search-fill" color={"#000"} width={20} />
                </button>
                <button onClick={() => handleDelete(i)}>
                  <Iconify icon="mingcute:delete-fill" color={"#000"} width={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="weatherHistoryCardItem" key={i}>
              <div>{`${item.name}, ${item.sys?.country}`}</div>
              <div className="weatherHistoryCardItemOption">
                <div className="weatherHistoryCardItemDate">{fDateTime(item.dt * 1000)}</div>
                <button onClick={() => handleGetWeatherData(item.name)}>
                  <Iconify icon="eva:search-fill" color={"#000"} width={20} />
                </button>
                <button onClick={() => handleDelete(i)}>
                  <Iconify icon="mingcute:delete-fill" color={"#000"} width={20} />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
