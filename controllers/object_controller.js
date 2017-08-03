const Object = require('../models/object')

const objectController = {

  getObject: (req, res) => {
    // let output = Object.findOne({$query:{key: req.params.key}, $orderby:{timestamp:-1}})
    // .exec()
    // .then(object => {
    //   res.send('You are at get /object/:key and your object found is ', object)
    // })

    // Object.findOne({ 'key': req.params.key }, '-_id -__v')
    // .sort('-timestamp')
    // .exec((err, object) => {
    //   if (err) {
    //     console.log('err is ', err)
    //   } else {
    //     let temp = new Date(object.timestamp).toString()
    //     console.log('temp is ', temp)
    //     object.timestamp = temp
    //     res.json(object)
    //   }
    // })
    res.send('hahaha')
  },

  postObject: (req, res) => {

    let newObject = new Object()
    let dateNowInMS = new Date().valueOf()
    for (let key in req.body) {
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
