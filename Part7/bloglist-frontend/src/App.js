import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Loginform'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import SuccessMessage from './components/SuccessMessage'
import FailureMessage from './components/FailureMessage'
import { setNotification } from './reducers/notiReducer'
import { useDispatch, useSelector } from 'react-redux'
import {  initBlog, newBlog } from './reducers/blogReducer'
import { Route, Link, useMatch, Routes, useNavigate } from 'react-router-dom'


const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/create">create new</Link>
      </div>
      <Routes>
        <Route path="/" element={<BlogList  />} />
        <Route path="/blogs/:id" element={<Blog blog={props.mblog} updateBlog={props.updateBlog} user={props.user} delFunc={props.delFunc} />} />
        <Route path="/create" element={<BlogCreate addBlog={props.addBlog}/>} />
      </Routes>
    </div>
  )
}

const BlogList = () => {
  const redBlogs = useSelector(state => state.blogs)
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {redBlogs.map(blog => <li key={blog.id}> <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>  </li>)}
      </ul>
    </div>
  )
}

const BlogCreate = ({ addBlog }) => (
  <div>
    <h2>Create new blog</h2>
    <BlogForm addBlog={addBlog}  />
  </div>
)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')
  const [user, setUser] = useState(null)
  const [failureMsg, setFailureMsg ] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const redBlogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initBlog())
  }, [dispatch])

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
    try {
      dispatch(newBlog(createdBlog))
      dispatch(setNotification('Successfully added new blog', 3))
      navigate('/')
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

  const match = useMatch('/blogs/:id')
  const matchBlog = match ? redBlogs.find(blog  => blog.id === match.params.id) : null

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
      <Menu mblog={matchBlog} updateBlog={updateBlog} user={user} delFunc={deleteBlog} addBlog={addBlog}/>
    </div>
  )
}

export default App
