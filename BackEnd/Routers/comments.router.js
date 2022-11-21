const commentController = require('../Controllers/comments.controller')
const express = require('express')
const router = express.Router()
const verifyToken = require('../../BackEnd/middlewares/verifyToken')

//Get to check login exist
router.get('/', verifyToken.VerifyToken, commentController.getAll)
router.post('/', verifyToken.VerifyToken, commentController.create)
router.put('/:id', verifyToken.VerifyToken, commentController.update)
router.delete('/:id', verifyToken.VerifyToken, commentController.deleteComment)

module.exports = router;