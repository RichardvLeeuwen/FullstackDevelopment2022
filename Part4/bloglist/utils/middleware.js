const logbook = require('./logger')

const errorHndler = (error, request, response, next) => { //taken from tutorial chapter 3, moving error into middleware
    logbook.error(error.message)
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message})
    }
    next(error)
  }

  module.exports = {errorHndler}