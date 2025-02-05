export default function Main({ weatherData, location }) {
	// Safely extract data with defaults
	const { current = {}, hourly = {} } = weatherData || {};
	const { temperature_2m = [], time = [] } = hourly;
	const currentWeather = { ...current };

	// Function to format time strings nicely
	const formatTime = (isoString) => {
		const date = new Date(isoString);
		return new Intl.DateTimeFormat("en-US", {
			weekday: "short",
			hour: "numeric",
			minute: "numeric",
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

	return (
		<section className="mt-8">
			<div className="flex flex-col justify-center items-center space-y-12 rounded-lg bg-blue-200 border border-gray-300 shadow max-w-3xl mx-auto p-8">
				<div className="flex-none">
					<div className="bg-blue-400 p-6 rounded-lg shadow-md">
						{hourlyData && (
							<p className="text-sm mb-3 text-gray-800">{formatTime(currentWeather.time)}</p>
						)}
						<h3 className="text-lg">{location}</h3>
						<p className="text-5xl font-bold">
							{currentWeather.temperature_2m &&
								`${currentWeather.temperature_2m}°C`}
						</p>
						<p>
							{currentWeather.relative_humidity_2m &&
								`${currentWeather.relative_humidity_2m}% humidity`}
						</p>
					</div>
				</div>

				<div className="w-full p-6 bg-blue-300 rounded-lg">
					<h3>Hourly Weather</h3>
					<div className="flex space-x-4 overflow-auto">
						{reorderedTemperatures.map((temp, index) => (
							<div
								key={index}
								className="text-center shrink-0 px-3 py-6 hover:bg-blue-400 transition-all rounded-md"
							>
								<span className="text-sm">
									{formatTime(reorderedTime[index])}
								</span>
								<p>{temp}°C</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
