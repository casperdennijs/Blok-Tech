const express = require('express')
const { engine } = require('express-handlebars');
const app = express();

const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
app.set("views", "./views");

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000);