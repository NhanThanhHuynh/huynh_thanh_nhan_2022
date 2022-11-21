const express = require('express')
const router = express.Router()
const userController = require('../../BackEnd/Controllers/users.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/register', userController.RegisterController)
router.post('/login', userController.LoginController)
router.get('/', verifyToken.VerifyToken, userController.LoginIn)

module.exports = router;