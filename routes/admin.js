const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const bcrypt = require('bcrypt');
const saltRounds = 10;

let session;

// Admin pagina (controleert of de gebruiker admin rechten heeft)
// Op de pagina zelf krijg je een lijst met alle gebruikers (met de optie om ze te verwijderen)
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

// Nieuwe gebruiker aanmaken pagina voor admin's (ook hier wordt gecontroleerd of de gebruiker admin rechten heeft)
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

// Functie die opgeroepen wordt wanneer de formulier met gegevens verstuurd wordt
// Hier worden de gegevens opgevangen en vervolgens opgeslagen in de database
// Wachtwoorden worden gehashed doormiddel van bcrypt
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

// Functie die opgeroepen wordt als er op de delete knop wordt gedrukt bij de gebruikers in de tabel
// Functie wil de gebruikersnaam weten om daarbij vervolgens de bijbehorende data gezamelijk te verwijderen
router.post('/delete-user', (req, res) => {
    User.find({ username: req.body.username }).remove().exec();
    res.redirect('/admin');
});

module.exports = router;