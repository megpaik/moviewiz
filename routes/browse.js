var express = require('express');
var router = express.Router();

router.get('/browse', (req, res) => {
  if (!req.session.username || req.session.username === '') {
    res.redirect('/index');
  } else {
    res.render('browse', { username: req.session.username });
  }
});

module.exports = router;