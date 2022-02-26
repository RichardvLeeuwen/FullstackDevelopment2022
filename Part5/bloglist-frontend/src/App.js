import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Loginform'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import SuccessMessage from './components/SuccessMessage'
import FailureMessage from './components/FailureMessage'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMsg, setSuccessMsg ] = useState(null)
  const [failureMsg, setFailureMsg ] = useState(null)
  const blogFormRef = useRef()

  const blogFormLabel = `Create blog`

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => { //as given in the tutorial in part 5
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNameChange = (event) => {
    setNewUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogUser', JSON.stringify(user)) 
      blogService.setToken(user.token)    
      setUser(user)
      setSuccessMsg(`Successfully logged in`)
            setTimeout(() => {
              setSuccessMsg(null)
            }, 3000)
    } 
    catch {
      setFailureMsg(`Wrong username or password`)
          setTimeout(() => {
            setFailureMsg(null)
          }, 3000)
    }
    setNewUsername('')
    setNewPassword('')
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (createdBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.createBlog(createdBlog)
        setBlogs(blogs.concat(newBlog))
        setSuccessMsg(`Successfully added new blog`)
              setTimeout(() => {
                setSuccessMsg(null)
              }, 3000)
    }
    catch {
      setFailureMsg(`Failed to add blog, please try again`)
            setTimeout(() => {
              setFailureMsg(null)
            }, 3000)
    }
  }

  const updateBlog = async (createdBlog) => { //updates likes
    try {
      const newBlog = await blogService.update(createdBlog.id, createdBlog)
      setBlogs(blogs.map(blog => blog.id === createdBlog.id ? newBlog : blog))
      setSuccessMsg(`Successfully liked`)
            setTimeout(() => {
              setSuccessMsg(null)
            }, 3000)
    }
    catch {
      setFailureMsg(`Failed to like, please try again`)
            setTimeout(() => {
              setFailureMsg(null)
            }, 3000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <SuccessMessage message={successMsg}/>
        <FailureMessage message={failureMsg}/>
        <LoginForm submitFunc={handleLogin} inputNameValue={username} inputNameChangeFunc={handleNameChange} inputPasswordValue={password} inputPhoneChangeFunc={handlePasswordChange} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <SuccessMessage message={successMsg}/>
      <FailureMessage message={failureMsg}/>
      <p> {user.name} logged in <button onClick={handleLogout}>logout</button> </p>
      <h2>Create new blog</h2>
      <Togglable buttonLabel={blogFormLabel} ref={blogFormRef}>
        <BlogForm addBlog={addBlog}  />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}
    </div>
  )
}

export default App
