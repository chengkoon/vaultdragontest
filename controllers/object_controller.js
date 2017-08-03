const Object = require('../models/object')

const objectController = {

  getObject: (req, res) => {

    Object.findOne({ 'key': req.params.key }, '-_id -__v -timestampMS')
    .sort('-timestampMS')
    .exec((err, object) => {
      if (err) {
        console.log('err is ', err)
      } else {
        res.json(object)
      }
    })
  },

  postObject: (req, res) => {

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
    newObject.save((err) => {
      if (err) throw err
    })
    res.send(req.body)
  }
}

module.exports = objectController
