const Object = require('../models/object')

const objectController = {

  getObject: (req, res) => {
    // let output = Object.findOne({$query:{key: req.params.key}, $orderby:{timestamp:-1}})
    // .exec()
    // .then(object => {
    //   res.send('You are at get /object/:key and your object found is ', object)
    // })

    Object.findOne({ 'key': req.params.key }, '-_id -__v')
    .sort('-timestamp')
    .exec((err, object) => {
      if (err) {
        console.log('err is ', err)
      } else {
        let temp = new Date(object.timestamp).toString()
        console.log('temp is ', temp)
        object.timestamp = temp
        res.json(object)
      }
    })
    // res.send('hahaha')
  },

  // testObject: (req, res) => {
  //   console.log('we are at testObject')
  //   res.send('hehehe')
  // },

  postObject: (req, res) => {

    var newObject = new Object()
    var dateNowInMS = new Date().valueOf()
    for (var key in req.body) {
      newObject['key'] = key
      newObject['value'] = req.body[key]
      newObject['timestamp'] = dateNowInMS
    }
    newObject.save((err) => {
      if (err) throw err
    })
    res.send(req.body)
  }
}

module.exports = objectController
