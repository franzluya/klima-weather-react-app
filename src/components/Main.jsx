export default function Main({ weatherData, location }) {
  // Safely extract data with defaults
  const { hourly = {} } = weatherData || {};
  const { temperature_2m = [], time = [] } = hourly;

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
  const currentIndex = time.findIndex((t) => new Date(t).getHours() === currentHour);

  // Get current data if found
  const currentData =
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
    reorderedTemperatures = [
      temperature_2m[currentIndex],
      ...temperature_2m.slice(0, currentIndex),
      ...temperature_2m.slice(currentIndex + 1),
    ];

    reorderedTime = [
      time[currentIndex],
      ...time.slice(0, currentIndex),
      ...time.slice(currentIndex + 1),
    ];
  }

  return (
    <section className="mt-8">
      <div className="flex flex-col justify-center items-center space-y-12 bg-blue-200 border border-gray-300 shadow max-w-3xl mx-auto p-8">
        {/* Today Card */}
        <div className="flex-none">
          <h2 className="text-md">Today</h2>
          <div className="bg-blue-400 p-6 rounded-md">
            <h3 className="text-lg">{location}</h3>
            <p className="text-3xl font-bold">
              {currentData ? `${currentData.temperature}°C` : `${temperature_2m[0]}°C`}
            </p>
            {currentData && <p className="text-sm">{currentData.formattedTime}</p>}
          </div>
        </div>

        {/* Hourly Weather Section */}
        <div className="w-full">
          <h3>Hourly Weather</h3>
          <div className="flex space-x-4 overflow-auto">
            {reorderedTemperatures.map((temp, index) => (
              <div key={index} className="text-center shrink-0 px-3 py-6 hover:bg-blue-300 transition-all rounded-md">
                <span className="text-sm">{formatTime(reorderedTime[index])}</span>
                <p>{temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
