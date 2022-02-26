import axios from 'axios'
//full url seen strangely proxy gives the error "Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
//- options.allowedHosts[0] should be a non-empty string."
const baseUrl = 'http://localhost:3003/api/blogs' 

let token = null
const setToken = newToken => {  token = `bearer ${newToken}`}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async newObject => {
  const config = {    
    headers: { Authorization: token },  
  }
  const response = await axios.post(baseUrl,newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {    
    headers: { Authorization: token },  
  }
  const response = await axios.put(`${baseUrl}/${id}`,newObject, config)
  return response.data
}


const defaultExport = { getAll,  createBlog, update, setToken }
export default defaultExport