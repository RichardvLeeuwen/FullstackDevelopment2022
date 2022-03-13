import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Loginform'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import SuccessMessage from './components/SuccessMessage'
import FailureMessage from './components/FailureMessage'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notiReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')
  const [user, setUser] = useState(null)
  const [failureMsg, setFailureMsg ] = useState(null)
  const blogFormRef = useRef()

  const blogFormLabel = 'Create blog'
  const dispatch = useDispatch()


  useEffect(() => {
    const getBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs.sort((a,b) => b.likes - a.likes))
    }
    getBlogs()
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
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification('Successfully logged in', 3))
    }
    catch(error) {
      setFailureMsg('Wrong username or password')
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
      const concBlogs = (blogs.concat(newBlog))
      setBlogs(concBlogs.sort((a,b) => b.likes - a.likes))
      dispatch(setNotification('Successfully added new blog', 3))
    }
    catch(error) {
      setFailureMsg('Failed to add blog, please try again')
      setTimeout(() => {
        setFailureMsg(null)
      }, 3000)
    }
  }

  const updateBlog = async (createdBlog) => { //updates likes
    try {
      const newBlog = await blogService.update(createdBlog.id, createdBlog)
      const mapBlogs = blogs.map(blog => blog.id === createdBlog.id ? newBlog : blog)
      setBlogs(mapBlogs.sort((a,b) => b.likes - a.likes))
      dispatch(setNotification('Successfully liked', 3))
    }
    catch(error) {
      setFailureMsg('Failed to like, please try again')
      setTimeout(() => {
        setFailureMsg(null)
      }, 3000)
    }
  }

  const deleteBlog = async (id) => { //updates likes
    try {
      if(window.confirm('Are you sure you want to delete this blog?')) {
        await blogService.deleteBlog(id)
        const mapBlogs = blogs.filter(blog => blog.id !== id)
        setBlogs(mapBlogs.sort((a,b) => b.likes - a.likes))
        dispatch(setNotification('Successfully deleted', 3))
      }
    }
    catch(error) {
      setFailureMsg('Failed to delete, please try again')
      setTimeout(() => {
        setFailureMsg(null)
      }, 3000)
    }
  }



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <SuccessMessage/>
        <FailureMessage message={failureMsg}/>
        <LoginForm submitFunc={handleLogin} inputNameValue={username} inputNameChangeFunc={handleNameChange} inputPasswordValue={password} inputPhoneChangeFunc={handlePasswordChange} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <SuccessMessage/>
      <FailureMessage message={failureMsg}/>
      <p> {user.name} logged in <button onClick={handleLogout}>logout</button> </p>
      <h2>Create new blog</h2>
      <Togglable buttonLabel={blogFormLabel} ref={blogFormRef}>
        <BlogForm addBlog={addBlog}  />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} delFunc={deleteBlog} />
      )}
    </div>
  )
}

export default App
