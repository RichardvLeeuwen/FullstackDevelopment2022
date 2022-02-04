import React from 'react'
import Country from './Country'
import Header from './Header'
import Language from './Language'

const CountriesDisplay = ({countries}) => {
  const tooManyReply = 'Too many matches, specify another filter'
  if(countries === tooManyReply) {
    return (
      <div>
        {tooManyReply}       
      </div>
    )
  }
  else if(countries.length === 1) {
    return (
      <div>
        <Header header={countries[0].name.common}/>
        <p>capital {countries[0].capital[0]}</p>
        <p>area {countries[0].area}</p>
        <h2>languages</h2>
        {Object.values(countries[0].languages).map((language) => <Language key={language} language={language}/>)} {/*Object.values() returns an array of all the language values*/}
        {countries[0].flag}
      </div>
    )
  }

  const display = countries.map((country) => <Country key={country.name.common} name={country.name.common}/>)
  return (
    <div>
      {display}       
    </div>
  )
}


export default CountriesDisplay