import React, { useState } from 'react'
const Blog = ({blog, updateBlog, user}) => {
  const [visible, setVisible] = useState(false)
  const allowedAdminAcess = blog.user.username === user.username ? true : false

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyleWhenHidden = { //given in exercise 5.7
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? 'none' : ''
  }

  const blogStyleWhenShown = { //given in exercise 5.7
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? '' : 'none'
  }

  const showDelete = { 
    display: allowedAdminAcess ? '' : 'none'
  }

  const upvoteBlog = (event) => {
    const newBlog = {
      user: blog.user,
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateBlog(newBlog)
  }
  return (
    <div>
      <div style={blogStyleWhenHidden}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View details</button>
      </div>
      <div style={blogStyleWhenShown}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide details</button>
      <br></br>
      {blog.url}
      <br></br>
      likes {blog.likes} <button onClick={upvoteBlog}>Like</button>
      <br></br>
      <button style={showDelete} >Delete</button>
      
      </div>
    </div>
  )  
}

export default Blog