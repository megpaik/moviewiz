var express = require('express');
var app = express();
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var oracle = require('oracledb');
var User = require('./User');
var login = require('./routes/index');
var browse = require('./routes/browse');
var search = require('./routes/search');
var register = require('./routes/register');
var logout = require('./routes/logout');

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// var connection = oracle.getConnection({
//     connectString  : '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = moviewiz.cmwawzqoe8cz.us-east-1.rds.amazonaws.com)(PORT = 1521))(CONNECT_DATA =(SID= ORCL)))',
//     user     : 'admin',
//     password : 'adminadmin'
//   },
//   function(err, connection) {
//     if (err) {
//       console.error(err.message);
//       return;
//     }
//     console.log('Connection was successful!');
//     connection.close(
//       function(err) {
//         if (err) {
//           console.error(err.message);
//           return;
//         }
//       });
//   }
// );

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

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

app.listen(app.get('port'), function () {
  console.log('Express server listening on port '+ app.get('port'));
});