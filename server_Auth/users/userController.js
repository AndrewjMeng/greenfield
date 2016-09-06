const request = require('request');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');

const db = require('../../client/auth/dbconfig.js');
const User = require('./userModel.js');

exports.signinUser = function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err,user) {
      if (!user) {
        res.redirect('/signin');
      } else {
        var savedPassword = user.password;
        User.comparePassword(password, savedPassword, function(err, match) {
          if (match) {
            res.redirect('/userEvents');
            //util.createSession(req, res, user);
          } else {
            res.redirect('/signin');
          }
        });
      }
  })
};

exports.signupUser = function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(err, newUser) {
          if (err) {
            res.send(500, err);
          }
          res.redirect('/signin');
          //util.createSession(req, res, newUser);
        });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
};