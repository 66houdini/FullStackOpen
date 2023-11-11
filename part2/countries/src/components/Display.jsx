import axios from "axios"
import { useState } from "react"
import Button from "./Button"
import useCountry from "../hooks"



const Display = ({countries, handleClick}) => {
    const [wind, setWind] = useState("")
    const [temp, setTemp] = useState("")
    const [iconUrl, setIconUrl] = useState('')
    const api_key = import.meta.env.VITE_SOME_KEY
    const openApi = `https://api.openweathermap.org/data/2.5/weather?q=${"nigeria"}&appid=${api_key}`
     axios.get(openApi).then(response => {
      const icon = response.data.weather[0].icon
      const wind = response.data.wind.speed
      const temperature  = response.data.main.temp
      const weatherUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
      setIconUrl(weatherUrl)
      setWind(wind)
      setTemp(temperature)
     })

    
    const country = useCountry()
    if(countries.length > 10){
      console.log(country)
      return (<p>Too many matches, specify another filter</p>)
    }

    if (countries.length === 0){
      return (<p>not found...</p>)
    }

    if(countries.length === 1){
     
      
      return (
        countries.map(country => 
          <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <p>Languages:</p>
            <ul>
              {Object.entries(country.languages).map(([code, name]) => (<li key={code}>{name}</li>))}
            </ul>
            <img src={country.flags.png} alt="country flag" width="120" height="120" />
            <h1>Weather in {country.name.common}</h1>
            <p>temperature: {temp} Fahrenheit </p>
            <img src={iconUrl} alt="weather icon" width="100" height="100" />
            <p>wind: {wind}m/s </p>
          </div>
          
          )
      )
    }
    
    


    return(
      countries.map(country => 
        <div key={country.name.common}>
          <p>{country.name.common} <Button handleClick={() => handleClick(country.name.common)} /></p>
        </div>
      )
    )
  }


export default Display




// import axios from "axios"
// import { useState } from "react"
// import Button from "./Button"



// const Display = ({countries, handleClick}) => {
//     const [wind, setWind] = useState("")
//     const [temp, setTemp] = useState("")
//     const [iconUrl, setIconUrl] = useState('')
//     const api_key = import.meta.env.VITE_SOME_KEY
//     const openApi = `https://api.openweathermap.org/data/2.5/weather?q=${"nigeria"}&appid=${api_key}`
//      axios.get(openApi).then(response => {
//       const icon = response.data.weather[0].icon
//       const wind = response.data.wind.speed
//       const temperature  = response.data.main.temp
//       const weatherUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
//       setIconUrl(weatherUrl)
//       setWind(wind)
//       setTemp(temperature)
//      })
    
//     if(countries.length > 10){
//       return (<p>Too many matches, specify another filter</p>)
//     }

//     if (countries.length === 0){
//       return (<p>not found...</p>)
//     }

//     if(countries.length === 1){
     
      
//       return (
//         countries.map(country => 
//           <div key={country.name.common}>
//             <h1>{country.name.common}</h1>
//             <p>Capital {country.capital[0]}</p>
//             <p>area {country.area}</p>
//             <p>Languages:</p>
//             <ul>
//               {Object.entries(country.languages).map(([code, name]) => (<li key={code}>{name}</li>))}
//             </ul>
//             <img src={country.flags.png} alt="country flag" width="120" height="120" />
//             <h1>Weather in {country.name.common}</h1>
//             <p>temperature: {temp} Fahrenheit </p>
//             <img src={iconUrl} alt="weather icon" width="100" height="100" />
//             <p>wind: {wind}m/s </p>
//           </div>
          
//           )
//       )
//     }
    
//     return(
//       countries.map(country => 
//         <div key={country.name.common}>
//           <p>{country.name.common} <Button handleClick={() => handleClick(country.name.common)} /></p>
//         </div>
//       )
//     )
//   }


// export default Display