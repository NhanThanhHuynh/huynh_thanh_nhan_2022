const mongoose = require('mongoose')

const posts = mongoose.model(
    "posts",
    mongoose.Schema({
        title: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true
        },
        tags: {
            type: Array
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    })
)

module.exports = {
    posts,
}