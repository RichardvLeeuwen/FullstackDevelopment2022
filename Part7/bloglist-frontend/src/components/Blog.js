const Blog = ({ blog, updateBlog }) => {

  if(!blog) {
    return null
  }
  const upvoteBlog = () => {
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
      <div className="blogWhenShown">
        <h2>{blog.title}</h2>
        created by {blog.author}
        <br></br>
        more info: {blog.url}
        <br></br>
        likes {blog.likes} <button onClick={upvoteBlog} className="likeBut" >Like</button>
        <br></br>
      </div>
    </div>
  )
}


export default Blog