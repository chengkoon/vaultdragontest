const Object = require('../models/object')
const assert = require('assert')

const objectController = {

  getObject: (req, res, next) => {

    var condition = [req.params]
    // makes adding more conditions (e.g. location) in the future possible and more manageable
    if (req.query.hasOwnProperty('timestamp')) {
      var timestampCondition = { 'timestampMS': { $lte: (parseInt(req.query.timestamp) * 1000) } }
      condition.push(timestampCondition)
    }
    condition = { $and: condition }

    Object.findOne(condition, '-_id -__v -timestampMS')
    .sort('-timestampMS')
    .exec((err, object) => {
      if (err) {
        console.log('err is ', err)
      } else {
        res.json(object)
      }
    })
  },

  postObject: (req, res, next) => {

    var newObject = new Object()
    var dateNow = new Date()
    var dateNowReadable = dateNow.toString()
    var dateNowInMS = dateNow.getTime()
    for (var key in req.body) {
      newObject['key'] = key
      newObject['value'] = req.body[key]
      newObject['timestamp'] = dateNowReadable
      newObject['timestampMS'] = dateNowInMS
    }
    newObject.save((err, doc) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(doc)
      }
    })
  }
}

module.exports = objectController
