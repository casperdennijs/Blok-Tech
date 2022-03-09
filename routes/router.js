const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('sign-in', {'title': 'Inloggen | League Connect'});
});
  
router.get('/sign-in', (req, res) => {
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

router.get('*', (req, res) => {
    res.status(404).render('404', {'title': 'Error 404: Pagina niet gevonden | League Connect'});
});
  

module.exports = router;