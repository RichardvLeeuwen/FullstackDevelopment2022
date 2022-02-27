const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor,async (request, response) => {

  
  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id',middleware.userExtractor, async (request, response) => {
  
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'owner and token do not match' })
  }


  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const newBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  let retBlog = JSON.parse(JSON.stringify(newBlog))
  retBlog['user'] = body.user
  response.json(retBlog)
})

module.exports = blogsRouter