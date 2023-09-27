import axios from "axios"
import { useEffect, useState } from "react"
import Display from "./components/Display"



const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

  useEffect(() => {
    axios.
    get(baseUrl)
    .then(response => {
      const countriesList = response.data
      setCountries(countriesList)
         })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)

  }
  const handleClick = (name) => {
    setSearch(name)
  };

  const filtered = countries.filter(country => country.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    return (
        <div>
            <p>find countries <input value={search} onChange={handleSearchChange} /></p>
            <Display countries={filtered} handleClick={handleClick} />
        </div>
    )
}

export default App
