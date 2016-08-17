var path = require('path');
var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {



  app.use('/api', denyNotLoggedIn, require('./routes/api'));
/**
  app.all('*', function(req, res, next) {
  //console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/google')
  }

});**/

  app.use('/public', express.static(path.join(__dirname, 'public')));


  /* GET home page. */
  app.get('/old', isLoggedIn, function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.use('/users', require('./routes/users'));







  app.get('/*', function(req, res, next) {
      res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });



}


// route middleware to make sure a user is logged in
function denyNotLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.status(401).send({ error: "401" });
}



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/google');
}
