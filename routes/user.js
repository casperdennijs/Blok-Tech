const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const bcrypt = require('bcrypt');
const saltRounds = 10;

let session;

/* Inloggen (checks encrypted password & creates session) */
router.post("/login", async (req, res) => {
    try {
        const getUser = await User.findOne({ username: req.body.username });
        if (getUser) {
          const comparePassword = await bcrypt.compare(req.body.password, getUser.password);
          if (comparePassword) {
            console.log("Succesvol ingelogd!");
            session = req.session;
            session.username = req.body.username;
            return res.status(200).redirect('/');
          } else {
            console.error("Verkeerde gebruikersnaam of wachtwoord!");
            return res.status(404).redirect('/sign-in');
          }
        } else {
            console.error("Verkeerde gebruikersnaam of wachtwoord!");
            return res.status(404).redirect('/sign-in');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).redirect('/sign-in');
    }
});

/* Registreren (encrypts password) */
router.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const createUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: "off"
    });

    createUser.save((error) => {
        if (error) {
            console.error(error);
            return res.status(500).redirect('/sign-up');
        } else {
            console.log("Account aangemaakt!")
            return res.status(200).redirect('/profile-setup');
        }
    });
});

/* Uitloggen (destroys session) */
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/sign-in');
});

router.post('/update', (req, res) => {
    session = req.session;
    User.updateOne({ username: session.username }, { username: req.body.username, email: req.body.email }).exec();
    session.username = req.body.username;
    res.redirect('/profile');
})

module.exports = router;