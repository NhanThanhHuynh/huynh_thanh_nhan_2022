const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 7878;
const user = require("./Routers/users.router");
const post = require("../BackEnd/Routers/posts.router")
const comment = require("../BackEnd/Routers/comments.router")
const { MONGO_DB_CONFIG } = require('./Configs/app.config')
const mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose
    .connect(MONGO_DB_CONFIG.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connecting')
    }, (error) => {
        console.log("DB can't be connect")
    }).catch(err => console.log(err.reason))

    
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/api/user", user);
app.use("/api/post/", post)
app.use("/api/comment", comment)


app.listen(PORT, console.log(`Server run on ${PORT}`));