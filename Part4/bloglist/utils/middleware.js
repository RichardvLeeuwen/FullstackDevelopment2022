const logbook = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const tokenExtractor = (request, response, next)  => { 
  const authorization = request.get('authorization') 
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token= authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next)  => { 
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })  
  }
  request.user = await User.findById(decodedToken.id)
  next()
}
const errorHndler = (error, request, response, next) => { //taken from tutorial chapter 3, moving error into middleware
    logbook.error(error.message)
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message})
    }else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({error: 'invalid token'})
    }
    next(error)
  }

  module.exports = {tokenExtractor, userExtractor, errorHndler}