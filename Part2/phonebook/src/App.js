import { useState } from 'react'
import PersonsDisplay from './components/PersonsDisplay'
import Header from './components/Header'
import PhoneForm from './components/PhoneForm'
import NameFilter from './components/NameFilter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const phonebookTitle = "Phonebook"
  const numbersTitle = "Numbers"
  const formTitle = "Add a new person"

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      window.alert(`${newName} is already added to the phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const showPersons = () => {
    if(newFilter==='') {
      return persons
    }
    else {
      return persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    }
  } 

  return (
    <div>
      <Header header={phonebookTitle}/>
      <NameFilter inputNameValue={newFilter} inputNameChangeFunc={handleFilterChange}/>
      <Header header={formTitle}/>
      <PhoneForm submitFunc={addPerson} inputNameValue={newName} inputNameChangeFunc={handleNameChange} inputPhoneValue={newNumber} inputPhoneChangeFunc={handleNumberChange}/>
      <Header header={numbersTitle}/>
      <PersonsDisplay persons={showPersons()}/>
    </div>
  )
}

export default App
