const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

let session;

/* Inloggen (creates session) */
router.post("/login", async (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }, (error, user) => {
        if (error) {
            console.log(error);
            return res.status(500).redirect('/sign-in');
        }
        if (!user) {
            return res.status(404).redirect('/sign-in');
        }
        session = req.session;
        session.username = req.body.username;
        return res.status(200).redirect('/');
    });
});

/* Registreren */
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save((error) => {
        if (error) {
            console.log(error);
            return res.status(500).redirect('/sign-up');
        }
        return res.status(200).redirect('/profile-setup');
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/sign-in');
});

module.exports = router;