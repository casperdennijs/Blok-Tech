const mongoose = require("mongoose");

const Users = new mongoose.Schema({
    username: {
        type: String
    },
    displayname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    profilepicture: {
        type: String
    }
})

module.exports = mongoose.model("User", Users);