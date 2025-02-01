export default function Main({ weatherData, location }) {
	const { hourly = {} } = weatherData || {};
	const { temperature_2m = [], time = [] } = hourly;

	return (
		<section>
			<div className="flex flex-wrap bg-blue-200 border border-gray-300 shadow max-w-3xl mx-auto p-8">
				<div>
					<h2>Today</h2>
					<div className="bg-blue-300 p-6 rounded-md">
						<h3 className="text-lg">{location}</h3>
						<span className="text-3xl font-bold">{temperature_2m[0]}°C</span>
					</div>
				</div>
				<div className="flex flex-wrap space-x-10">
					{temperature_2m.length > 0 ? (
						temperature_2m.map((temperature, index) => (
							<div key={index} className="flex space-x-4">
								<p>{temperature}</p>
							</div>
						))
					) : (
						<p>No temperature data available.</p>
					)}
					{time.length > 0 ? (
						time.map((timeEl, index) => <span key={index}>{timeEl}</span>)
					) : (
						<p>No temperature data available.</p>
					)}
				</div>
			</div>
		</section>
	);
}
