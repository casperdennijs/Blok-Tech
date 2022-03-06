const express = require('express')
const { engine } = require('express-handlebars');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

app.use('/static', express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
app.set("views", "./views");

app.get('/', (req, res) => {
  res.render('sign-in', {'title': 'Inloggen | League Connect'});
});

app.get('/sign-in', (req, res) => {
  res.render('sign-in', {'title': 'Inloggen | League Connect'});
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up', {'title': 'Registreren | League Connect'});
});

app.get('/forgot-password', (req, res) => {
  res.render('forgot-password', {'title': 'Wachtwoord vergeten | League Connect'});
});

app.get('/profile-setup', (req, res) => {
  res.render('profile-setup', {'title': 'Profiel instellen | League Connect'});
});

app.post ('/login', urlencodedParser, (req, res) => {
  res.send('Username: ' + req.body.username + '<br>Password: ' + req.body.password)
})

app.get('/login' )

app.listen(3000);