import {
  FaCloud,
  FaClock,
  FaLocationDot,
  FaCalendarDays,
} from "react-icons/fa6";
import WeatherStats from "./WeatherStats";
import { formatTime, formatDate } from "/src/utils.js";

export default function Main({ weatherData, location, loading }) {
  // Safely extract data with defaults
  const { current = {}, hourly = {}, daily = {} } = weatherData || {};
  const { temperature_2m = [], time = [] } = hourly;
  const currentWeather = current ? { ...current } : {};
  const dailyWeather = daily ? { ...daily } : {};

  // Get the current index based on the current hour
  const currentHour = new Date().getHours();
  const currentIndex = time.findIndex(
    (t) => new Date(t).getHours() === currentHour,
  );

  // Get current data if found
  const hourlyData =
    currentIndex !== -1
      ? {
          temperature: temperature_2m[currentIndex],
          formattedTime: formatTime(time[currentIndex]),
        }
      : null;

  // Reorder arrays so that the current temperature appears first
  let reorderedTemperatures = temperature_2m;
  let reorderedTime = time;

  if (currentIndex !== -1) {
    reorderedTemperatures = [...temperature_2m.slice(currentIndex + 1)];

    reorderedTime = [...time.slice(currentIndex + 1)];
  }

  const weatherBackgrounds = {
    0: "/images/weather0.png",
    1: "/images/cloudy.png",
    2: "/images/cloudy.png",
    3: "/images/cloud.png",
    45: "/images/cloud.png",
    48: "/images/cloud.png",
    51: "/images/drizzle_rain.png",
    53: "/images/cloudrain.png",
    55: "/images/cloudrain.png",
    61: "/images/drizzle_rain.png",
    63: "/images/heavyrain.png",
    65: "/images/heavyrain.png",
    80: "/images/heavyrain.png",
    81: "/images/heavyrain.png",
    82: "/images/heavyrain.png",
    85: "/images/cold.png",
    86: "/images/cold.png",
    95: "/images/storm.png",
  };

  const dailyMaxTemp = dailyWeather.temperature_2m_max ?? [];
  const dailyMinTemp = dailyWeather.temperature_2m_max ?? [];
  const dailyMinTime = dailyWeather.time ?? [];
  const dailyWeatherCode = dailyWeather.weather_code ?? [];


  return (
    <main>
      {loading ? (
        <div className="flex justify-center mt-10 h-screen">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 rounded-lg p-8 text-white">
          <div className="mb-10 flex w-full items-center justify-between">
            <div className="p-6">
              {hourlyData && (
                <p className="text-sm">{formatTime(currentWeather.time)}</p>
              )}
              {loading ? (
                ""
              ) : (
                <h3 className="my-6 flex items-center text-lg">
                  {location}
                  <FaLocationDot />
                </h3>
              )}
              <p className="my-4 text-4xl font-bold lg:text-5xl">
                {currentWeather.temperature_2m &&
                  `${currentWeather.temperature_2m}°C`}
              </p>
              <p className="text-sm">
                {currentWeather.apparent_temperature &&
                  `Feels like ${currentWeather.apparent_temperature}°`}
              </p>
            </div>

            <img
              className="w-48 drop-shadow-lg lg:w-80"
              src={weatherBackgrounds[currentWeather.weather_code]}
            ></img>
          </div>

          <WeatherStats
            currentWeather={currentWeather}
            dailyWeather={dailyWeather}
          />

          <div className="bg-opacity-50 w-full rounded-lg bg-sky-700 p-4">
            <div className="flex items-center space-x-1.5">
              <FaClock />
              <h3 className="text-sm">Hourly Weather</h3>
            </div>
            <div className="flex space-x-4 overflow-auto [&::-webkit-scrollbar]:hidden">
              {reorderedTemperatures.map((temp, index) => (
                <div
                  key={index}
                  className="shrink-0 rounded-md px-3 py-6 text-center transition-all hover:bg-sky-400"
                >
                  <p className="text-sm font-semibold">{temp}°C</p>
                  <span className="text-sm">
                    {formatTime(reorderedTime[index])}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-opacity-50 w-full rounded-lg bg-sky-700 p-4">
            <div className="flex items-center space-x-1.5">
              <FaCalendarDays />
              <h3 className="text-sm">Daily Weather</h3>
            </div>
            <div className="flex space-x-4 overflow-auto [&::-webkit-scrollbar]:hidden">
              {dailyMaxTemp.map((temp, index) => (
                <div
                  key={index}
                  className="flex shrink-0 flex-col items-center space-y-1.5 rounded-md px-3 py-6 text-center transition-all hover:bg-sky-400"
                >
                  <img
                    className="w-8 drop-shadow-lg"
                    src={weatherBackgrounds[dailyWeatherCode[index]]}
                  ></img>
                  <p className="text-sm font-semibold">
                    {temp}°/ {dailyMinTemp[index]}°
                  </p>
                  <span className="text-sm">
                    {formatDate(dailyMinTime[index])}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
