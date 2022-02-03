import { useState } from 'react'

const Person = ({ name }) => {
  return (
    <div>
      <p>
        {name}
      </p>
    </div>
  )
}

const Form = ({submitFunc, inputValue, inputChangeFunc, inputDesc, buttonDesc}) => {
  return (
    <form onSubmit={submitFunc}>
      <div>
        {inputDesc}: <input value={inputValue} onChange={inputChangeFunc}/>
      </div>
      <div>
        <button type="submit">{buttonDesc}</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form submitFunc={addPerson} inputValue={newName} inputChangeFunc={handleNameChange} inputDesc='name' buttonDesc='add'/>
      <h2>Numbers</h2>
      {persons.map((person) => <Person key={person.name} name={person.name}/>)}
    </div>
  )
}

export default App
