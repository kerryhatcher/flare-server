var path = require('path');
var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {


  app.use('/public', express.static(path.join(__dirname, 'public')));


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



};



