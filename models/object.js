const mongoose = require('mongoose')

const ObjectSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
})

const Object = module.exports = mongoose.model('Object', ObjectSchema)
