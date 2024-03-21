const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller') //dhmiourgoume mia metablhth gia na valoume ton controller

router.get('/', userController.findAll)  //den thelei parenthesh findAll() giati einai reference
router.get('/:username', userController.findOne)
router.post('/', userController.create)
router.patch('/:username', userController.update)
router.delete('/:username/products/:id', userController.delete)

module.exports = router