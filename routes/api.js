var express = require('express');
var passport = require('passport');
var message = require('../controller/messages')
var router = express.Router();




router.route('/')
  .get(function(req, res, next) {

  res.send({message: "hello"})
  });

router.route('/user')
  .get(function(req, res, next) {

    res.send(req.user)

  })
  .post(function(req, res, next) {

    res.send({ message: req.user })

  });

router.route('/message')
  .get(function(req, res, next) {

    message.get(req, res, next, 'Pack ye bags');

  })
  .post(function(req, res, next) {

    message.create(req, res, next, req.body.title, req.body.title, req.body.content)

    var accountSid = 'AC7fa6a65966982d4d186f42f7cff88832'; // Your Account SID from www.twilio.com/console
    var authToken = 'e7c0e0c3a836036217edd731010708d0';   // Your Auth Token from www.twilio.com/console

    var client = require('twilio')(accountSid, authToken);

    //console.log(client);

    /**

    client.sendMessage({
      body: req.body.content,
      to: '+14789518703',  // Text this number
      from: '14782922263 ' // From a valid Twilio number
    }, function(err, text) {
        console.log(err);
    });

    client.makeCall({

    to:'+14789518703', // Any number Twilio can call
    from: '+14782922263', // A number you bought from Twilio and can use for outbound communication
    url: 'https://2lsk6kusae.execute-api.us-east-1.amazonaws.com/prod/prompt' // A URL that produces an XML document (TwiML) which contains instructions for the call

}, function(err, responseData) {

    //executed when the call has been initiated.
    console.log(responseData.from); // outputs "+14506667788"

}); **/


  });

  router.route('/messages')
    .get(function(req, res, next) {
      message.getall(req, res, next);


    })
    .post(function(req, res, next) {

      res.send(message.create())

    });




module.exports = router;
