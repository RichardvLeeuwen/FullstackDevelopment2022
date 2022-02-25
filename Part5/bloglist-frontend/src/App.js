import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Loginform'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleNameChange = (event) => {
    setNewUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ username, password })

    //noteService.setToken(user.token)    
    setUser(user)
    setNewUsername('')
    setNewPassword('')
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm submitFunc={handleLogin} inputNameValue={username} inputNameChangeFunc={handleNameChange} inputPasswordValue={password} inputPhoneChangeFunc={handlePasswordChange} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p> {user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
