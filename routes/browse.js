var express = require('express');
var router = express.Router();

router.get('/browse', function (req, res, next) {
  res.render('browse');
});

module.exports = router;
