import React from 'react'
import Header from './Header'
import Language from './Language'

const CountryView = ({ country }) => {
  return (
    <div>
        <Header header={country.name.common}/>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages</h2>
        {Object.values(country.languages).map((language) => <Language key={language} language={language}/>)} {/*Object.values() returns an array of all the language values*/}
        {country.flag}
      </div>
  )
}


export default CountryView