const app = require('./app')
const http = require('http')
const config= require('./utils/config')
const logbook = require('./utils/logger')

const server = http.createServer(app)

const PORT = config.PORT
server.listen(PORT, () => {
  logbook.info(`Server running on port ${PORT}`)
})