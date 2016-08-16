var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.user.displayName, req.user._json)
  res.render('users', {user: req.user});
});

module.exports = router;
