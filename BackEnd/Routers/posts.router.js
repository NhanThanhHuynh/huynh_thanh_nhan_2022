const postController = require('../Controllers/posts.controller')
const express = require('express')
const router = express.Router()
const verifyToken = require('../../BackEnd/middlewares/verifyToken')

//Get to check login exist
router.get('/', verifyToken.VerifyToken, postController.getAll)
router.post('/', verifyToken.VerifyToken, postController.createPost)

module.exports = router;