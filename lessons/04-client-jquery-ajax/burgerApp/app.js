var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var ingredients = require('./routes/ingredients.js');

var index = require('./routes/index');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/burgers');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database Connection Successful");
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ingredients', ingredients.ingGET);
app.get('/order', ingredients.orderGET);
app.get('/kitchen', ingredients.burgerGET);
app.post('/ingredients', ingredients.ingPOST);
app.post('/stock', ingredients.stockPOST);
app.post('/edit', ingredients.editPOST);
app.post('/burger', ingredients.burgerPOST);
app.post('/delete', ingredients.burgerDELETE);

app.listen(3000);
