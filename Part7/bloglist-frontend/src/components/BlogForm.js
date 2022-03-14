import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }
    addBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={createBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label><input className="titleInput" value={title} onChange={handleTitleChange} /> <br></br>
        <Form.Label>author:</Form.Label> <input className="authorInput" value={author} onChange={handleAuthorChange} /> <br></br>
        <Form.Label>url:</Form.Label> <input className="urlInput" value={url} onChange={handleUrlChange} /> <br></br>
        <Button varient='primary' type="submit" className="submitBlogInput" >create</Button>
      </Form.Group>
    </Form>
  )
}

export default BlogForm