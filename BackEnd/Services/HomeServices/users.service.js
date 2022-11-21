//@Access  = private
const express = require("express");
const { users } = require("../../Models/HomeModel/users.model");

async function getUserName({ username }) {
    let userName = await users.findOne({ username: username });
    return userName
}

async function getPassword({ userId }) {
    const userPassword = await users.findById(userId).select('-password')
    return userPassword
}

async function saveUser({ username, hashedPassword }) {
    const newUser = new users({ username: username, password: hashedPassword });
    await newUser.save();
    return newUser
}

module.exports = {
    getPassword,
    getUserName,
    saveUser
};