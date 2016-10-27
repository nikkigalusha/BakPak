'use strict';
const db = require('../db/db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  (username, password, done) => {
    console.log('LOGIN ', username);
    db.query(`INSERT INTO users (username, city) VALUES (${username}, ${password})`)
      .on('end', () => {
        console.log('Inserted into DB!');
      });

      { 'local.username' : username }, (err, user) => {
      // This error is for server/db errors not user/pw errors
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password'});
      }
      return done(null, user);
    };
}));

module.exports