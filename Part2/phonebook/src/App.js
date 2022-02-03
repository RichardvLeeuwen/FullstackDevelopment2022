import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <div>
      <p>
        {name} {number}
      </p>
    </div>
  )
}

const Header = ({header}) => {
  return (
    <div>
      <h2>{header}</h2>
    </div>
  )
}

const PhoneForm = ({submitFunc, inputNameValue, inputNameChangeFunc,inputPhoneValue, inputPhoneChangeFunc }) => {
  const formTitle = "Add a new person"

  return (
    <form onSubmit={submitFunc}>
      <Header header={formTitle}/>
      <div>
        name: <input value={inputNameValue} onChange={inputNameChangeFunc}/>
        <br></br>
        number: <input value={inputPhoneValue} onChange={inputPhoneChangeFunc}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const PhoneFilter = ({inputNameValue, inputNameChangeFunc }) => {
  const formTitle = "filter shown with"

  return (
    <div>
      {formTitle} <input value={inputNameValue} onChange={inputNameChangeFunc}/>        
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const phonebookTitle = "Phonebook"
  const numbersTitle = "Numbers"

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
      <PhoneFilter inputNameValue={newFilter} inputNameChangeFunc={handleFilterChange}/>
      <PhoneForm submitFunc={addPerson} inputNameValue={newName} inputNameChangeFunc={handleNameChange} inputPhoneValue={newNumber} inputPhoneChangeFunc={handleNumberChange} />
      <Header header={numbersTitle}/>
      {showPersons().map((person) => <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App
