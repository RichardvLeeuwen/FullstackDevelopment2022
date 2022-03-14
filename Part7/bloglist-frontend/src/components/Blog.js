const Blog = ({ blog } ) => {

  if(!blog) {
    return null
  }
  return (
    <div>
      <div >
        <h2 className='text-primary'>{blog.title}</h2>
        created by {blog.author}
        <br></br>
        more info: {blog.url}
        <br></br>
        likes {blog.likes}
        <br></br>
      </div>
    </div>
  )
}


export default Blog