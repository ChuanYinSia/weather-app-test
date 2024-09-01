import PropTypes from "prop-types";
import Iconify from "../components/iconify";
import useSettings from "../hooks/useSettings";

// ----------------------------------------------------------------------

WeatherSearchComponent.propTypes = {
  country: PropTypes.string,
  handleSetCountry: PropTypes.func,
  handleGetWeatherData: PropTypes.func,
};

export default function WeatherSearchComponent({ country, handleSetCountry, handleGetWeatherData }) {
  const { themeMode, onToggleMode } = useSettings();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGetWeatherData(country);
    }
  };

  return (
    <div className="SearchEngine">
      <input type="text" className="city-search" placeholder="Country" name="query" value={country} onChange={(e) => handleSetCountry(e.target.value)} onKeyDown={handleKeyPress} />
      <button onClick={() => handleGetWeatherData(country)}>
        <Iconify icon="eva:search-fill" color={"#fff"} />
      </button>
      <button onClick={() => onToggleMode()}>
        <Iconify icon={themeMode === "dark" ? "eva:moon-outline" : "eva:sun-outline"} color={"#fff"} />
      </button>
    </div>
  );
}
