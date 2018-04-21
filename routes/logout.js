var express = require('express');
var router = express.Router();

router.get('/logout', (req, res) => {
  req.session.username = '';
  res.render('index');
});

module.exports = router;