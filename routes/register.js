var express = require('express');
var router = express.Router();
var User = require('../User');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  User.addUser(req.body.username, req.body.password, (err) => {
    if (err) res.send('Error: ' + err);
    else res.send('Welcome to moviewiz, ' + req.body.username);
  });
});

module.exports = router;