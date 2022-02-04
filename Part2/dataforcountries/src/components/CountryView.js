import React from 'react'
import {useState, useEffect } from 'react'
import Header from './Header'
import Language from './Language'
import axios from 'axios'


const Weather = ({weather}) => {
  if(weather.length === 0) {
    return (
      <div>
      </div>
    )
  }
  const temp = Math.round((weather.main.temp - 273.15)*100)/100 //convert from kelvin to celsius, then round to 2 decimals
  return (
    <div>
       <p>temperature {temp} Celsius</p>
       <p>wind {weather.wind.speed} m/s</p>
       <p>Description: {weather.weather[0].main}</p>
       <p>Humidity: {weather.main.humidity} %</p>
    </div>
  )
}

const CountryView = ({ country }) => {
  const [weather, setWeather] = useState([]) 
  const apikey = process.env.REACT_APP_API_KEY
  const apiReq = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apikey}`
  const weatherTitle = `Weather in ${country.capital[0]}`

  useEffect(() => { 
    axios.get(apiReq)
      .then(response => {
        setWeather(response.data)
      })
  }, [apiReq])

  return (
    <div>
        <Header header={country.name.common}/>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages</h2>
        {Object.values(country.languages).map((language) => <Language key={language} language={language}/>)} {/*Object.values() returns an array of all the language values*/}
        {country.flag}
        <h2>{weatherTitle}</h2>
        <Weather weather={weather}/>
      </div>
  )
}


export default CountryView