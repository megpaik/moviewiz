var express = require('express');
var router = express.Router();

router.get('/logout', (req, res) => {
  req.session.username = '';
  res.redirect('/index');
});

module.exports = router;