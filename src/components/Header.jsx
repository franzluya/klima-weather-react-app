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
    <header className="flex flex-wrap items-center justify-center gap-6 p-4">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-bold text-white">Klima - Weather</h1>
        <img className="w-14 drop-shadow-md" src="images/cloud.png"></img>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            onChange={handleChange}
            className="min-w-20 rounded-full border-0 bg-sky-200/70 px-4 py-2"
            type="text"
            name="location"
            placeholder="Enter location"
          />
          <button className="absolute inset-y-0 right-5 cursor-pointer rounded-md">
            <FaMagnifyingGlass className="text-gray-600" />
          </button>
        </div>
      </form>
    </header>
  );
}
