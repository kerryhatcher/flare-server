
var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require('mongoose').model('User');

module.exports = function () {
    passport.use(new GoogleStrategy({
            clientID: '82323686191-vnfcv2iv9m0af6sivbuvrc0egd0kekq3.apps.googleusercontent.com',
            clientSecret: '4hSwQ8NdYnjA0SnVEdMmJo9e',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
function (req, accessToken, refreshToken, profile, done) {
  // Set the provider data and include tokens
           var providerData = profile._json;
           providerData.accessToken = accessToken;
           providerData.refreshToken = refreshToken;
           // Create the user OAuth profile
           var providerUserProfile = {
               firstName: profile.name.givenName,
               lastName: profile.name.familyName,
               displayName: profile.displayName,
               email: profile.emails[0].value,
               username: profile.username,
               avatarUrl: providerData.image.url,
               providerIdentifierField: 'id',
               provider: 'google',
               providerData: providerData
};

            var searchMainProviderIdentifierField = 'providerData.' +
                providerUserProfile.providerIdentifierField;
            // Define main provider search query
            var query = {};
            query.provider = providerUserProfile.provider;
            query[searchMainProviderIdentifierField] =
                providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

            User.findOne(query, function (err, user) {

                if (user) {
                    console.log('User Exists Already');
                    done(null, user);
                } else {
                    console.log('new user');
                    var newUser = new User(providerUserProfile);
                    newUser.save(function (err, user) {
                        console.log('err: ' + err);
                        console.log('user saved' + user._id);
                        done(null, user);
                    });
                }
            });

        }
    ));
};
