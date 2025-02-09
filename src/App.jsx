import { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
export default function App() {
	const [location, setLocation] = useState("Manila");
	const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState({});
	useEffect(() => {
		setIsLoading(true)
		if (!location) return;

		const fetchCoordinates = async () => {
			try {
				const geocodingUrl = `https://nominatim.openstreetmap.org/search.php?q=${location}&format=jsonv2`;
				const response = await fetch(geocodingUrl);
				const data = await response.json();

				if (data.length > 0) {
					const { lat, lon } = data[0];
					setCoordinates({ lat, lon });
				} else {
					throw new Error("Location not found");
				}
			} catch (err) {
				throw new Error("Error fetching coordinates" + err);
			}
		};
		fetchCoordinates();
	}, [location]);

	useEffect(() => {
		if (!coordinates.lat || !coordinates.lon) return;
		const fetchWeatherData = async () => {
			try {
				const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`;
				const response = await fetch(openMeteoUrl);
				const data = await response.json();
				if (Object.keys(data).length > 0) {
					setData(data);
				}
				console.log(data);
			} catch (error) {
				throw new Error(error);
			} finally {
				setIsLoading(false)
			}
		};
		fetchWeatherData();
	}, [coordinates]);

	const handleSearch = (newLocation) => {
		setLocation(newLocation);
	};
	return (
		<>
			<Header onSearch={handleSearch} />
			<Main weatherData={data} location={location} loading={isLoading} />
		</>
	);
}
