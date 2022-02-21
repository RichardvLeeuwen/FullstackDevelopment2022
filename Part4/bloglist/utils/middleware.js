const logbook = require('./logger')

const tokenExtractor = (request, response, next)  => { 
  const authorization = request.get('authorization') 
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token= authorization.substring(7)
  }
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

  module.exports = {tokenExtractor, errorHndler}