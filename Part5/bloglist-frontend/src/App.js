import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Loginform'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import SuccessMessage from './components/SuccessMessage'
import FailureMessage from './components/FailureMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [successMsg, setSuccessMsg ] = useState(null)
  const [failureMsg, setFailureMsg ] = useState(null)

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }
    try {
      const newBlog = await blogService.createBlog(blog)
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
    setTitle('')
    setAuthor('')
    setUrl('')
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
      <BlogForm submitFunc={addBlog} inputTitleValue={title} inputTitleChangeFunc={handleTitleChange} inputAuthorValue={author} inputAuthorChangeFunc={handleAuthorChange} inputUrlValue={url} inputUrlChangeFunc={handleUrlChange} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
