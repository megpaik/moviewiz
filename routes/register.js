var express = require('express');
var router = express.Router();
var User = require('../User');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  User.addUser(req.body.username, req.body.password, (err) => {
    if (err) res.send('Error: ' + err);
    else {
      req.session.username = req.body.username;
      res.render('browse');
    };
  });
});

module.exports = router;