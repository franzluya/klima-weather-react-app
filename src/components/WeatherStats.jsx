import { FaDroplet, FaSun, FaWind, FaCloudArrowUp } from "react-icons/fa6";

const Stat = ({ name, icon, data, symbol }) => {
  return (
    <div className="rounded-lg bg-sky-600 p-4">
      <div className="flex items-center space-x-1">
        {icon}
        <h2 className="text-sm">{name}</h2>
      </div>
      <p className="my-2 text-center font-semibold">
        {data}
        {symbol}
      </p>
    </div>
  );
};

function WeatherStats({ currentWeather, dailyWeather }) {
  const dailyUV = dailyWeather.uv_index_max ?? [];
  return (
    <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
      <Stat
        name="Humidity"
        icon={<FaDroplet />}
        data={currentWeather.relative_humidity_2m}
        symbol="%"
      />
      <Stat name="UV Index" icon={<FaSun />} data={dailyUV[0]}/>
      <Stat
        name="Wind Speed"
        icon={<FaWind />}
        data={currentWeather.wind_speed_10m}
        symbol="km/h"
      />
      <Stat
        name="Pressure"
        icon={<FaCloudArrowUp />}
        data={currentWeather.surface_pressure}
        symbol="hPa"
      />
    </div>
  );
}

export default WeatherStats;
