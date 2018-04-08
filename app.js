var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var login = require('./routes/login');

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('port', process.env.PORT || 8000);

// index page
app.get('/', function (req, res) {
  res.render('index');
});

// mount routers here
app.use('/', login);


app.listen(app.get('port'), function () {
  console.log('Express server listening on port '+ app.get('port'));
});