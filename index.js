const express = require('express')
const env = process.env.NODE_ENV || 'development'
const config = require('./config/config')[env]

const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const objectRoutes = require('./routes/objects')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000

// Connect To Database
mongoose.Promise = global.Promise
mongoose.connect(config.db)

// On Connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${config.db}`)
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`)
});

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Routes
app.use('/object', objectRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message})
})

// Checks if development or testing env
if (require.main === module) {
  server.listen(port, () => {
    console.log(`Server Listening on port ${port}`)
  })
} else { // for testing
  console.log('we are in testing mode')
  module.exports = server
}
