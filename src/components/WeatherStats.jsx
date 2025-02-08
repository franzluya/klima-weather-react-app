import { FaDroplet, FaSun, FaWind, FaCloudArrowUp } from "react-icons/fa6";
function WeatherStats({ currentWeather, dailyWeather }) {
  const dailyUV = dailyWeather.uv_index_max ?? [];
  return (
    <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="rounded-lg bg-sky-600 p-4">
        <div className="flex items-center space-x-1">
          <FaDroplet />
          <h2 className="text-sm">Humidity</h2>
        </div>
        <p className="my-2 text-center font-semibold">
          {currentWeather.relative_humidity_2m}%
        </p>
      </div>
      <div className="rounded-lg bg-sky-600 p-4">
        <div className="flex items-center space-x-1">
          <FaSun />
          <h2 className="text-sm">UV Index</h2>
        </div>
        <p className="my-2 text-center font-semibold">{dailyUV[0]}</p>
      </div>
      <div className="rounded-lg bg-sky-600 p-4">
        <div className="flex items-center space-x-1">
          <FaWind />
          <h2 className="text-sm">Wind Speed</h2>
        </div>
        <p className="my-2 text-center font-semibold">
          {currentWeather.wind_speed_10m} km/h
        </p>
      </div>
      <div className="rounded-lg bg-sky-600 p-4">
        <div className="flex items-center space-x-1">
          <FaCloudArrowUp />
          <h2 className="text-sm">Pressure</h2>
        </div>
        <p className="my-2 text-center font-semibold">
          {currentWeather.surface_pressure} hPa
        </p>
      </div>
    </div>
  );
}

export default WeatherStats;
