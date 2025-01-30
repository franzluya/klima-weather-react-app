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
		<header>
			<div>
				<h1>Klima - Weather</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<input onChange={handleChange} type="text" name="location"></input>
				<button>Search</button>
			</form>
		</header>
	);
}
