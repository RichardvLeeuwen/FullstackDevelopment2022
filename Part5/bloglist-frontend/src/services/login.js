import axios from 'axios'
//full url seen strangely proxy gives the error "Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
//- options.allowedHosts[0] should be a non-empty string."
const baseUrl = 'http://localhost:3003/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
const defaultExport = { login }
export default defaultExport