import { useState, useEffect } from 'react'
import PersonsDisplay from './components/PersonsDisplay'
import Header from './components/Header'
import PhoneForm from './components/PhoneForm'
import NameFilter from './components/NameFilter'
import Phonebook from './services/Phonebook'
import SuccessMessage from './components/SuccessMessage'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMsg, setSuccessMsg ] = useState(null)

  const phonebookTitle = "Phonebook"
  const numbersTitle = "Numbers"
  const formTitle = "Add a new person"

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName)){
      if(window.confirm(`${newName} is already added to the phonebook, would you like to replace the old number with the new one?`)) {
        const oldPerson = persons.filter(person => person.name === newName) //find() was probably easier in hindsight
        Phonebook.updatePerson(oldPerson[0].id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== oldPerson[0].id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMsg(`Successfully updated ${updatedPerson.name}`)
            setTimeout(() => {
              setSuccessMsg(null)
            }, 5000)
          })
        .catch(error => { alert(
          `The person does no no longer exist`)
          setPersons(persons.filter(person => person.name !== newPerson.name))
          setNewName('')
          setNewNumber('')
        })
      }
      return
    }
    Phonebook.createPerson(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMsg(`Successfully added ${createdPerson.name}`)
        setTimeout(() => {
          setSuccessMsg(null)
        }, 5000)
      })
    .catch(error => { alert(
      `The person does no no longer exist`)
      setPersons(persons.filter(person => person.name !== newPerson.name))
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = name => {
    const deleteThisPerson = persons.find(person => person.name === name)
    if(window.confirm(`Are you sure you want to delete ${deleteThisPerson.name}? `)) {
      Phonebook.deletePerson(deleteThisPerson.id)
        .then(()=> {
          setPersons(persons.filter(person => person.name !== name))
          setSuccessMsg(`Successfully deleted ${name}`)
          setTimeout(() => {
            setSuccessMsg(null)
          }, 5000)
        })
      .catch(error => { alert(
        `The person does no no longer exist`)
        setPersons(persons.filter(person => person.name !== name))
      })
    }
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
  
  useEffect(() => { 
    Phonebook.getAllPersons()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  return (
    <div>
      <Header header={phonebookTitle}/>
      <SuccessMessage message={successMsg}/>
      <NameFilter inputNameValue={newFilter} inputNameChangeFunc={handleFilterChange}/>
      <Header header={formTitle}/>
      <PhoneForm submitFunc={addPerson} inputNameValue={newName} inputNameChangeFunc={handleNameChange} inputPhoneValue={newNumber} inputPhoneChangeFunc={handleNumberChange}/>
      <Header header={numbersTitle}/>
      <PersonsDisplay persons={showPersons()} deleteFunc={deletePerson}/>
    </div>
  )
}

export default App
