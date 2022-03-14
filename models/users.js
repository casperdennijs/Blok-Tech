const mongoose = require("mongoose");

const Users = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilepicture: {
        type: String
    },
    isAdmin: {
        type: String
    }
})

module.exports = mongoose.model("User", Users);