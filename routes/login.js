var express = require('express');
var router = express.Router();

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/loginAdmin', function (req, res, next) {
  // add login check here
});

module.exports = router;
