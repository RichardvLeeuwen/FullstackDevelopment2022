import React from 'react'
import Country from './Country'
import CountryView from './CountryView'

const CountriesDisplay = ({countries, filterFunc}) => {
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
      <CountryView country={countries[0]}/>
    )
  }

  const display = countries.map((country) => <Country key={country.name.common} filFunc={filterFunc} name={country.name.common}/>)
  return (
    <div>
      {display}       
    </div>
  )
}


export default CountriesDisplay