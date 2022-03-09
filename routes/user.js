const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");

router.post("/createUser", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        displayname: null,
        email: req.body.email,
        password: req.body.password,
        profilepicture: null
    })
    newUser.save();
    res.status(200).redirect('/profile-setup');
})

router.post("/setupProfile", async (req, res) => {
    const setupProfile = new User({
        displayname: req.body.displayname,
        profilepicture: req.body.profilepicture
    })
    setupProfile.update();
    res.status(200).redirect('/home');
})

module.exports = router;