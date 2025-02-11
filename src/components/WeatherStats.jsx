import { FaDroplet, FaSun, FaWind, FaCloudArrowUp } from "react-icons/fa6";
import { formatTimeOnly } from "/src/utils.js";
const Stat = ({ name, icon, data, symbol, colspan }) => {
  return (
    <div className={`rounded-lg bg-sky-600 p-4 col-span-${colspan}`}>
      <div className="flex items-center space-x-1">
        {icon}
        <h2 className="text-sm">{name}</h2>
      </div>
      <p className="my-2 text-center font-semibold">
        {data} {symbol}
      </p>
    </div>
  );
};

function WeatherStats({ currentWeather, dailyWeather }) {
  console.log(dailyWeather);
  const dailyUV = dailyWeather.uv_index_max ?? [];
  const dailySunrise = dailyWeather?.sunrise?.[0] ?? "";
  const dailySunset = dailyWeather?.sunset?.[0] ?? "";
  return (
    <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
      <Stat
        name="Humidity"
        icon={<FaDroplet />}
        data={currentWeather.relative_humidity_2m}
        symbol="%"
        colspan={1}
      />
      <Stat name="UV Index" icon={<FaSun />} data={dailyUV[0]} colspan={1} />
      <Stat
        name="Wind Speed"
        icon={<FaWind />}
        data={currentWeather.wind_speed_10m}
        symbol="km/h"
        colspan={1}
      />
      <Stat
        name="Pressure"
        icon={<FaCloudArrowUp />}
        data={currentWeather.surface_pressure}
        symbol="hPa"
        colspan={1}
      />
      <Stat
        name="Sunrise"
        icon={<FaSun />}
        data={formatTimeOnly(dailySunrise)}
        symbol=""
        colspan={2}
      />
      <Stat
        name="Sunset"
        icon={<FaSun />}
        data={formatTimeOnly(dailySunset)}
        symbol=""
        colspan={2}
      />
    </div>
  );
}

export default WeatherStats;
