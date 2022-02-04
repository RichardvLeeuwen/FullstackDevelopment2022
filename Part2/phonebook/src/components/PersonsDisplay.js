import React from 'react'
import Person from './Person'

const PersonsDisplay = ({persons}) => {

  return (
    <div>
      {persons.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)}       
    </div>
  )
}


export default PersonsDisplay