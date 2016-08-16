var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var User = require('./model/user.model');
var Message = require('./model/message.model');
var List = require('./model/list.model');


console.log(process.env);

console.log(process.env.DATABASE);


var db = mongoose.connect('mongodb://' + process.env.DATABASE.MongoDB_mongo-cluster_1 + ',' + process.env.DATABASE.MongoDB_mongo-cluster_2 + ',' + process.env.DATABASE.MongoDB_mongo-cluster_3 + '/flare?replicaSet=rs0');




var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({secret: '1qazxsw23edcvfr4'}));

app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')();

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    console.log(req.isAuthenticated())
    if (true) {
      res.sendFile(__dirname + '/public/index.html');
    } else {
      res.redirect('/auth/github')
    }

});
app.get('/Flares*', function(req, res, next) {
    console.log(req.isAuthenticated())
    if (true) {
      res.sendFile(__dirname + '/public/index.html');
    } else {
      res.redirect('/auth/github')
    }

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


module.exports = app;
