const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const session = require('express-session');
require('dotenv').config();

const port = process.env.PORT || 5000;

const connectDB = require('./config/database');
connectDB();

const router = require("./routes/router");
const user = require("./routes/user");
const admin = require("./routes/admin");

const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true 
}));

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
app.set("views", "./views");

app.use('/', router);
app.use('/', user);
app.use('/', admin);

// 404 pagina (wanneer je een url gebruikt die niet bestaat wordt hier naar omgeleid)
app.get('*', (req, res) => {
  res.status(404).render('404', {'title': 'Error 404: Pagina niet gevonden | League Connect'});
});

app.listen(port);
