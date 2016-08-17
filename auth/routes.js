var express = require('express');
var passport = require('passport');
var router = express.Router();
auth = require('./config');

module.exports = function(app) {

router.route('/login')
.get(passport.authenticate('google', {
    successRedirect: '/users/',
    failure: '/error/'
}));

router.route('/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/users/',
    failure: '/error/'
}));

router.route('/google')
  .get(passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));
   //app.use('/api', denyNotLoggedIn, require('./api'));
  // Session Routes
    var session = require('./session');
    router.route('/session')
    .get(auth.ensureAuthenticated, session.session)
    .post(session.login)
    .delete(session.logout);

  router.route('/')
    .get(function(req, res, next){
      res.send("hello")
    });

return router;
}
