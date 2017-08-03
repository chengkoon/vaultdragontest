const express = require('express')
const router = express.Router()
const objectController = require('../controllers/object_controller')

router.post('/', objectController.postObject)
// router.get('/', objectController.testObject)

router.get('/:key', objectController.getObject)

module.exports = router
