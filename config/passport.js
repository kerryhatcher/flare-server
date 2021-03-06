var passport = require('passport'),
    User = require('mongoose').model('User');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
/*
    passport.deserializeUser(function(user, done) {
        User.findbyId(id, function (err, user) {
            done(err, user);
        });
    });*/

    require('./strategies/google.strategy')();
};
