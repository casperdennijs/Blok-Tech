const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const bcrypt = require('bcrypt');
const saltRounds = 10;

let session;

router.get('/admin', (req, res) => {
    session = req.session;
    if (!session.username) {
        console.error("Je bent niet ingelogd!")
        res.redirect('/');
    } else {
        User.find({ username: session.username }).then((documents) => {
            let result = documents.map(user => user.isAdmin)
            if (result == "on") {
                User.find().then((documents) => {
                    let result = documents.map(user => user.username)
                    console.log(result);
                    res.render('admin', {'title': 'Admin | League Connect', users: result});
                });
            } else {
                console.error("Dit account heeft geen admin rechten!")
                res.redirect('/');
            }
        });
    }
});

router.get('/admin/new-user', (req, res) => {
    session = req.session;
    if (!session.username) {
        console.error("Je bent niet ingelogd!")
        res.redirect('/');
    } else {
        User.find({ username: session.username }).then((documents) => {
            let result = documents.map(user => user.isAdmin)
            if (result == "on") {
                res.render('new-user', {'title': 'Gebruiker aanmaken | League Connect'});
            } else {
                console.error("Dit account heeft geen admin rechten!")
                res.redirect('/');
            }
        });
    }
});

router.post('/create-user', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const createUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin
    });

    createUser.save((error) => {
        if (error) {
            console.error(error);
            return res.status(500).redirect('/admin/new-user');
        } else {
            console.log("Account aangemaakt!")
            return res.status(200).redirect('/admin');
        }
    });
});

router.post('/delete-user', (req, res) => {
    console.log(req.body.username)
    User.find({ username: req.body.username }).remove().exec();
    res.redirect('/admin');
});

module.exports = router;