const express = require('express');
const router = express.Router();
const User = require("../models/users");

let session;

router.get('/', (req, res) => {
    session = req.session;
    if (!session.username) {
        res.redirect('sign-in');
    } else {
        res.render('home', {'title': "Home | League Connect", 'username': session.username});
    }
});
  
router.get('/sign-in', (req, res) => {
    console.log(req.session)
    res.render('sign-in', {'title': 'Inloggen | League Connect'});
});
  
router.get('/sign-up', (req, res) => {
    res.render('sign-up', {'title': 'Registreren | League Connect'});
});
  
router.get('/forgot-password', (req, res) => {
    res.render('forgot-password', {'title': 'Wachtwoord vergeten | League Connect'});
});

router.get('/password-reset', (req, res) => {
    session = req.session;
    if (!session.username) {
        res.redirect('sign-in');
    } else {
        res.render('password-reset', {'title': 'Wachtwoord opnieuw instellen | League Connect'});
    }
});
  
router.get('/profile-setup', (req, res) => {
    res.render('profile-setup', {'title': 'Profiel instellen | League Connect'});
});

router.get('/profile', (req, res) => {
    session = req.session;
    if (!session.username) {
        console.error("Je bent niet ingelogd!")
        res.redirect('/');
    } else {
        res.render('profile', {'title': 'Profiel | League Connect', username: session.username})
    }
});

router.get('/profile/edit', (req, res) => {
    session = req.session;
    if (!session.username) {
        console.error("Je bent niet ingelogd!")
        res.redirect('/');
    } else {
        User.find({ username: session.username }).then((documents) => {
            let username = documents.map(user => user.username);
            let email = documents.map(user => user.email);
            res.render('edit-profile', {'title': 'Profiel bijwerken | League Connect', username: username, email: email})
        });
    }
});

module.exports = router;