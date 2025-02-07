import {
	FaCloud,
	FaClock,
	FaLocationDot,
	FaCalendarDays,
} from "react-icons/fa6";

export default function Main({ weatherData, location }) {
	// Safely extract data with defaults
	const { current = {}, hourly = {}, daily = {} } = weatherData || {};
	const { temperature_2m = [], time = [] } = hourly;
	const currentWeather = { ...current };
	const dailyWeather = { ...daily };

	const formatTime = (isoString) => {
		const date = new Date(isoString);
		return new Intl.DateTimeFormat("en-US", {
			weekday: "short",
			hour: "numeric",
			hour12: true,
		}).format(date);
	};
	const formatDate = (isoString) => {
		const date = new Date(isoString);
		return new Intl.DateTimeFormat("en-US", {
			weekday: "long",
			hour12: true,
		}).format(date);
	};

	// Get the current index based on the current hour
	const currentHour = new Date().getHours();
	const currentIndex = time.findIndex(
		(t) => new Date(t).getHours() === currentHour
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
		<section>
			<div className="flex flex-col items-center space-y-8 rounded-lg h-screen max-w-3xl mx-auto p-8">
				<div className="flex items-center justify-between w-full">
					<div className="p-6">
						{hourlyData && (
							<p className="text-sm text-gray-600">
								{formatTime(currentWeather.time)}
							</p>
						)}
						<h3 className="text-lg flex items-center my-6 text-gray-800">
							{location}
							<FaLocationDot />
						</h3>
						<p className="text-4xl lg:text-5xl font-bold my-4">
							{currentWeather.temperature_2m &&
								`${currentWeather.temperature_2m}°C`}
						</p>
						<p className="text-sm">
							{currentWeather.apparent_temperature &&
								`Feels like ${currentWeather.apparent_temperature}°`}
						</p>
					</div>

					<img
						className="w-48 lg:w-80 drop-shadow-lg"
						src={weatherBackgrounds[currentWeather.weather_code]}
					></img>
				</div>

				<div className="w-full p-6 bg-sky-300/50 rounded-lg">
					<div className="flex items-center space-x-1.5 text-gray-800">
						<FaClock />
						<h3 className="text-sm">Hourly Weather</h3>
					</div>
					<div className="flex space-x-4 overflow-auto">
						{reorderedTemperatures.map((temp, index) => (
							<div
								key={index}
								className="text-center shrink-0 px-3 py-6 hover:bg-sky-400 transition-all rounded-md"
							>
								<p className="font-semibold text-sm">{temp}°C</p>
								<span className="text-sm">
									{formatTime(reorderedTime[index])}
								</span>
							</div>
						))}
					</div>
				</div>
				<div className="w-full p-6 bg-sky-300/50 rounded-lg">
					<div className="flex items-center space-x-1.5 text-gray-800">
						<FaCalendarDays />
						<h3 className="text-sm">Daily Weather</h3>
					</div>
					<div className="flex space-x-4 overflow-auto">
						{dailyMaxTemp.map((temp, index) => (
							<div
								key={index}
								className="text-center shrink-0 px-3 py-6 hover:bg-sky-400 transition-all rounded-md flex flex-col items-center space-y-1.5"
							>
								<img
									className="w-8 drop-shadow-lg"
									src={weatherBackgrounds[dailyWeatherCode[index]]}
								></img>
								<p className="font-semibold text-sm">
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
		</section>
	);
}
