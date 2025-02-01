import {useState} from "react"

export default function Header({ onSearch }) {
  const [inputValue, setInputValue] = useState("")

  const handleChange = (e) => setInputValue(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue)
    setInputValue("")
  }

	return (
		<header className="flex items-center justify-center gap-6 p-4 bg-blue-400">
			<div>
				<h1 className="text-xl font-bold text-white">Klima - Weather</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<input onChange={handleChange} className="bg-white border-0 px-4 py-2 rounded-md" type="text" name="location" placeholder="Enter location"/>
				<button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">Search</button>
			</form>
		</header>
	);
}
