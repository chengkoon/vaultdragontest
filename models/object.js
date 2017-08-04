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
    type: String,
    required: true
  },
  timestampMS: {
    type: Number,
    required: true
  }
})

ObjectSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    var retJson = {
      key: ret.key,
      value: ret.value,
      timestamp: ret.timestamp
    }
    return retJson
  }
})

const Object = module.exports = mongoose.model('Object', ObjectSchema)
