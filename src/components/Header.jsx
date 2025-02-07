import { FaMagnifyingGlass } from "react-icons/fa6";

import { useState } from "react";

export default function Header({ onSearch }) {
	const [inputValue, setInputValue] = useState("");

	const handleChange = (e) => setInputValue(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(inputValue);
		setInputValue("");
	};

	return (
		<header className="flex items-center justify-center flex-wrap gap-6 p-4">
			<div className="flex items-center space-x-2">
				<h1 className="text-lg font-bold text-white">Klima - Weather</h1>
				<img className="w-14 drop-shadow-md" src="images/cloud.png"></img>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="relative">
					<input
						onChange={handleChange}
						className="bg-sky-200 border-0 px-4 py-2 rounded-full min-w-20"
						type="text"
						name="location"
						placeholder="Enter location"
					/>
					<button className="inset-y-0 right-5  rounded-md cursor-pointer absolute ">
					<FaMagnifyingGlass className="text-gray-600"/>
					</button>
				</div>
			</form>
		</header>
	);
}
