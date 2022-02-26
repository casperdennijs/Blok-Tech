const express = require('express')
const { engine } = require('express-handlebars');
const app = express();

app.use(express.static('public'))

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayoyt: 'main'
}));
app.set('view engine', '.hbs');
app.set("views", "./views");

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000);