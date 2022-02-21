const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const password = request.body.passwordHash
  const username = request.body.username
  const existingUser = await User.findOne({ username })  //given in the tutorial seen the mongoose-unique-validator does not work with mongoose version 6.x
  if (existingUser) { 
    return response.status(400).json({ error: 'username must be unique'})  
  }

  if(password.length < 3) { //checked in the controller as instructed seen password and hash sizes are not the same
    return response.status(400).json({ error: 'password must be at least 3 characters long'})  
  }

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