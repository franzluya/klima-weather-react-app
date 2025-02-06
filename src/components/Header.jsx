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
		<header className="flex items-center justify-center gap-6 p-4">
			<div>
				<h1 className="text-xl font-bold text-white">Klima - Weather</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="relative">
					<input
						onChange={handleChange}
						className="bg-white border-0 px-4 py-2 rounded-full"
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
