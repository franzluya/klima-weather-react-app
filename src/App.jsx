import { useState, useEffect } from "react";
import Header from "./components/Header";

export default function App() {
	const [location, setLocation] = useState("Manila");
	const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

	const [data, setData] = useState(null);
	useEffect(() => {
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
				const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m`;
				const response = await fetch(openMeteoUrl);
				const data = await response.json();

				setData(data);
			} catch (error) {
				throw new Error(error);
			}
		};
		fetchWeatherData();
	}, [coordinates]);

	const handleSearch = (newLocation) => {
		setLocation(newLocation);
	};
	console.log(data);
	return <Header onSearch={handleSearch} />;
}
