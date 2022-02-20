import axios from 'axios'
const url = '/api/persons'

//as instructed in 2.16, similar as what was shown in the example. Due to a react warning I assigned the default exports to a variable first.
const getAllPersons = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const createPerson = newPerson => {
  const request = axios.post(url, newPerson)
  return request.then(response => response.data)
}

const updatePerson = (id, newPerson) => {
  const request = axios.put(`${url}/${id}`, newPerson)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

const exportDefault = { getAllPersons, createPerson, updatePerson, deletePerson }
export default exportDefault
