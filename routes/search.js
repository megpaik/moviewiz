var express = require('express');
var router = express.Router();

router.get('/search', function (req, res, next) {
  res.render('search');
});

router.post('search', (req, res, next) => {
  console.log(req.body);
});
module.exports = router;