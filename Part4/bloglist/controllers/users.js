const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const password = request.body.passwordhash
  const hash = await bcrypt.hash(password, 10) //no questioning the magic number!

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash: hash
  })

  const result = await user.save()
  response.status(201).json(result)
})

module.exports = usersRouter