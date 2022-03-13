import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, {content: anecdote, votes: 0})
  return response.data
}

const updateAnec = async (id) => {
  const oldAnec = await axios.get(`${baseUrl}/${id}`)
  const newAnec = {...oldAnec.data, votes: oldAnec.data.votes + 1}
  const response = await axios.put(`${baseUrl}/${id}`, newAnec)
  return response.data
}


const obj = {getAll, createNew, updateAnec}
export default obj