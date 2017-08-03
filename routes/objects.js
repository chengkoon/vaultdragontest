const express = require('express')
const router = express.Router()
const objectController = require('../controllers/object_controller')

router.get('/', objectController.postObject)

router.get('/:key', objectController.getObject)

module.exports = router
