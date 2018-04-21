var express = require('express');
var router = express.Router();
var User = require('../User');

router.get('/index', function (req, res) {
  res.render('index');
});

router.post('/index', function(req, res) {
  username = req.body.username;
  password = req.body.password;
  User.check(username, password, function(err, isValid) {
    if (err) {
      res.send('Error: ' + err);
    } else {
      if (isValid) {
        req.session.username = username;
        res.redirect('/browse');
      } else {
        res.send('Incorrect Password');
      }
    }
  });
});

module.exports = router;