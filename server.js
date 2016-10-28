var express = require('express');
var bodyParser = require('body-parser');
var keys  = require("./config.js");
var request = require('request');
var query  = require("./query.js");
var path = require('path');
var parseString = require('xml2js').parseString;
var client = require('./db/db');
var Yelp = require('yelp');
//Auth middleware
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

var yelp = new Yelp(keys.yelp);

var QPXClient = require('qpx-client');//for qpx
util = require('util');//for qpx

var app = express();

passport.serializeUser(function(user, done){
  console.log('serializeUser: ', user);
  done(null, user);
});

passport.deserializeUser(function(user, done){
  console.log('deserializeUser: ', user);
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},(username, password, done) => {
  client.query(`SELECT username, password FROM users WHERE username = '${username}'`).on('end', (row) => {
    if (!row.rows[0]) {
      console.log('NO USERNAME');
      return done(null, false, { message: 'No Username'});
    } else if (!bcrypt.compareSync(password, row.rows[0].password)) {
      console.log('STORED PW: ', row.rows[0].password);
      console.log('WRONG PW: ', password);
      return done(null, false);
    } else {
      console.log('YOU JUST SIGNED IN DAWG');
      var user = {
        username: row.rows[0].username,
        password: row.rows[0].password
      };
      return done(null, user);
    }
  });
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));


//cookie.secure set to false for testing purposes
//set to true for real use over https connection
app.use(session({ secret: 'cat',
                  resave: true,
                  saveUninitialized: true,
                  cookie: { secure: false,
                            maxAge: 600000 }
                }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req,res){
  res.send(200).end();
});

app.get('/signout', function(req, res) {
  console.log('SIGN OUT REQ', req);
  req.session.destroy(function(err){
    console.log('logging out');
    res.redirect('/');
  });
});

app.post('/signup', function(req, res, next){
  console.log(req.body.username);
  client.query(`SELECT username FROM users WHERE username = '${req.body.username}'`).on('end', (result) => {
    if (result.rows.length !== 0) {
      console.log('SELECT query result ', result.rows);
      res.send('data');
    } else {
      var hashed = bcrypt.hashSync(req.body.password, 10);
      client.query(`INSERT INTO users (username, password) VALUES ('${req.body.username}', '${hashed}')`).on('end', () => {
        console.log('Inserted new user into DB!');
        res.send('Inserted new user into DB!');
      });
    }
  })
});

app.post('/signin',
  passport.authenticate('local'),
    // If this function gets called, authentication was successful
    // `req.user` contains the authenticated user
    function(req, res, next) {
      console.log('Inside passport.authenticate 107', req.session.passport.user);
      console.log(req.body.username, req.body.password+' is successfully logged in.');
      console.log('SESSIONNN: ',req.session);

      var user = {
        username: req.body.username,
        password: req.body.password
      };

      return res.sendStatus(200);

      // req.logIn(user, function(err){
      //   if (err) {
      //     return res.sendStatus(403);
      //   }
      //   console.log('inside signin logIn 120', req.user);
      //   return res.sendStatus(200);
      // });
});

app.post('/mystuff', function(req, res){
  let stuff;
  console.log('Inside MYSTUFF GET', req.user);
  client.query(`SELECT * FROM stuff INNER JOIN users ON (stuff.userid = users.id) WHERE users.username = '${req.user.username}'`).on('end', (result) => {
    console.log(result.rows);
    res.status(200).send(result.rows);
  });
});

app.post('/hotels', function(req,res){
  query.city = req.body.city;
  var queryHotels = query.hotels + query.city + '&key=' + keys.google;

  request(queryHotels, function(error, resp, body){
    if(error) {
      console.log(error);
    }
    res.end(resp.body);
  })
});

app.post('/landmarks', function(req,res){
   var yelpQuery = {
    term: 'local Flavour',
    location: req.body.city,
    radius: 2000,
    limit: 20,
    open_now: true,
    sort_by: 'review_count'
    // categories:req.body.category
  }
  yelp.search(yelpQuery)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    res.send(err.statusCode, err.data);
  });
});


app.post('/weather', function(req,res){
  console.log('weather req made');
  query.city = req.body.city;
  var queryWeather = query.weather + query.city + '&appid=' + keys.weather;

  request(queryWeather, function(error, resp, body){
    if(error) {
      console.log('weather query failed');
      console.log(error);
    }
    console.log('weather query success');
    res.end(body);
  })
});

app.post('/promos', function(req,res){
  query.city = req.body.city;
  var queryPromos = query.promos + keys.sqoot + '&location=' + query.city;
  request(queryPromos, function(error, resp, body){
    if(error) {
      console.log(error);
    }
    res.send(resp.body);
  })
});

app.post('/events', function(req,res){
  query.city = req.body.city;
  var queryEvents = query.events + keys.eventful + '&location=' + query.city + '&date=Future';
  request(queryEvents, function(error, resp, body){
    if(error) {
      console.log(error);
    }
    parseString(resp.body, function(err, result){
      console.log(result);
      res.end(JSON.stringify(result));
    });

  })
})

app.post('/translate', function(req,res){
  query.text=req.body.inputText
  query.country = 'en-' + req.body.country;
  var queryTranslate = query.translate + keys.yandex + '&text=' + query.text + '&lang=' + query.country;
  request(queryTranslate, function(error, resp, body){
    if(error) {
      console.log(error);
    }
    res.end(resp.body);
  })
});

options = { //for qpx
  key: keys.google,
  timeout: 15000
}

qpxClient = new QPXClient(options);

app.post('/flights', function(req,res){
  searchConfig = {
    body: {
      "request":{
       "passengers":{
          "adultCount": 1
        },
        "slice": [
          {
            "origin": req.body.origin,
            "destination": req.body.destination,
            "date": req.body.date
          }
        ],
        "solutions": 10
      }
    }
  }
  qpxClient.search(searchConfig, function(err,data){
    if(err){
      console.log('ERROR' + err);
    }else{
      res.send(data);
    }
  })

});

app.post('/images', function(req,res){
  query.city = req.body.city;
  var options = {
    url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q='+query.city+'&mkt=en-us&size=wallpaper',
    headers: {
      'Ocp-Apim-Subscription-Key': '46f42b01258b4a46836eb4bcd886c7b1'
    },
  }
  request(options, function(error, resp, body){
    if(error) {
      console.log(error);
    }
    res.end(resp.body);
  })
});

app.post('/yelp', function(req, res) {
  // term, latitude, longitude, radius, limit=20, sort_by review_count, open_now=true, categories=ex)bars,French
  // use geolocation for lat and long, allow users to select categories, sent as req.body
  // use default to term="food", radius, limit, open_now=true, sort_by:review_count, more is better
  var yelpQuery = {
    term: req.body.category,
    location: req.body.location,
    radius: 2000,
    limit: 10,
    open_now: true,
    sort_by: 'review_count'
    // categories:req.body.category
  }
  if (req.body.lat) {
    yelpQuery.latitude = req.body.lat;
    yelpQuery.longitude = req.body.long;
  }
  yelp.search(yelpQuery)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    res.send(err.statusCode, err.data);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on...', port);
});
