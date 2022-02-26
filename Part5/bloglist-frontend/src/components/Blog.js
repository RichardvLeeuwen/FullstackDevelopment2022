import React, { useState } from 'react'
const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

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
      likes {blog.likes} <button>Like</button>
      
      </div>
    </div>
  )  
}

export default Blog