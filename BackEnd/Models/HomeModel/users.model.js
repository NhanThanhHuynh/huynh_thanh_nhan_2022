const mongoose = require('mongoose')

const users = mongoose.model(
    "users",
    mongoose.Schema({
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: false
        },
        name: {
            type: String
        },
        dob: {
            type: Date
        },
        created_at: {
            type: Date,
            default: Date.now()
        }
    })
)

module.exports = {
    users,
}