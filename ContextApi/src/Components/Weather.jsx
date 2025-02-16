import { useState } from "react";

export default function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchWeather = async () => {
    if (!location.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=b0ad1ce020527d0adff11a6ffd865070&query=${location}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or zip code"
          className="p-2 rounded bg-gray-800 text-white"
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {weatherData && weatherData.current && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img src={weatherData.current.weather_icons[0]
}></img>
<p>Location:{weatherData.location.name},{weatherData.location.country}</p>
          <h2 className="text-2xl font-bold">{weatherData.name}</h2>
          <p>Temperature: {weatherData.current.temperature}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_speed} m/s</p>

        </div>
      )}
    </div>
  );
}
