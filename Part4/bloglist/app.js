const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config= require('./utils/config')
const logbook = require('./utils/logger')
const mongoose = require('mongoose')

logbook.info('connecting to', config.MONGODB_URI)
const mongoUrl =  config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app