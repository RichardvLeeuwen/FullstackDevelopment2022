import React from 'react'
import Person from './Person'

const PersonsDisplay = ({persons, deleteFunc}) => {

  return (
    <div>
      {persons.map((person) => <Person key={person.name} name={person.name} number={person.number} deleteFunc={deleteFunc}/>  )}       
    </div>
  )
}


export default PersonsDisplay