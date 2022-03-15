const express = require('express');
const router = express.Router();
const User = require("../models/users");

let session;

// Home pagina (checked of je ingelogd bent, zo niet dan ga je naar inlogpagina)
router.get('/', (req, res) => {
    session = req.session;
    if (!session.username) {
        res.redirect('sign-in');
    } else {
        res.render('home', {'title': "Home | League Connect", 'username': session.username});
    }
});
  
// Inlogpagina
router.get('/sign-in', (req, res) => {
    console.log(req.session)
    res.render('sign-in', {'title': 'Inloggen | League Connect'});
});

// Registreerpagina
router.get('/sign-up', (req, res) => {
    res.render('sign-up', {'title': 'Registreren | League Connect'});
});

// Profiel pagina (kan je alleen heen als je ingelogd bent)
router.get('/profile', (req, res) => {
    session = req.session;
    if (!session.username) {
        console.error("Je bent niet ingelogd!")
        res.redirect('/');
    } else {
        res.render('profile', {'title': 'Profiel | League Connect', username: session.username})
    }
});

// Profiel bewerk pagina (kan je alleen heen als je ingelogd bent)
// Hier krijg je een formulier waar je je gebruikersnaam en email kan aanpassen
// Formulier wordt van te voren ingevuld met huidige informatie
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