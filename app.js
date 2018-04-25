var express = require('express');
var app = express();
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var User = require('./User');
var login = require('./routes/index');
var browse = require('./routes/browse');
var search = require('./routes/search');
var register = require('./routes/register');
var logout = require('./routes/logout');
var advanced = require('./routes/advanced');
var bing = require('./routes/bing');

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  name: 'session',
  keys: ['youlikekrabbypattiesdontyousquidward', 'babybluerhinosliketoruninblueberryfarms'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.set('port', process.env.PORT || 8000);

app.get('/', function (req, res) {
  if (req.session.username && req.session.username !== '') {
    res.redirect('/browse');
  } else {
    res.redirect('/index');
  }
});

// mount routers here
app.use('/', login);
app.use('/', register);
app.use('/', browse);
app.use('/', search);
app.use('/', logout);
app.use('/', advanced);
app.use('/', bing);

app.listen(app.get('port'), function () {
  console.log('Magic happens on port '+ app.get('port'));
});