const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session);
    if (!req.session) {
        res.redirect('sign-in');
    } else {
        res.render('home', {'title': "Home | League Connect"});
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
  
router.get('/profile-setup', (req, res) => {
    res.render('profile-setup', {'title': 'Profiel instellen | League Connect'});
});
  

module.exports = router;