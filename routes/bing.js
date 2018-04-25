var express = require('express');
var router = express.Router();

router.get('/bing', (req, res) => {
  if (!req.session.username || req.session.username === '') {
    res.redirect('/index');
  } else {
    res.render('bing', { username: req.session.username });
  }
});

module.exports = router;