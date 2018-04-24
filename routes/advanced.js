var express = require('express');
var router = express.Router();

router.get('/advanced', (req, res) => {
  if (!req.session.username || req.session.username === '') {
    res.redirect('/index');
  } else {
    res.render('advanced', { username: req.session.username });
  }
});

module.exports = router;
