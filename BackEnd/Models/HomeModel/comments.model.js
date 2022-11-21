const mongoose = require('mongoose')

const comments = mongoose.model(
    "comments",
    mongoose.Schema({
        title: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts'
        }
    })
)

module.exports = {
    comments,
}