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

passport.serializeUser(function(id, done){
  done(null, id);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},(username, password, done) => {
  client.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}')`).on('end', () => {
    console.log('Inserted into DB!');
  });
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'cat'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req,res){
  res.send(200).end();
});

app.post('/signup', function(req, res, next){
  console.log(req.body.username, req.body.password);
  passport.authenticate('local', function(err, user, info){
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/signup');
    }

    req.logIn(user, function(err){
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

// app.post('/location', function(req, res){
//   client.query(`INSERT INTO users (username, city) VALUES ('nikkig', '${req.body.city}')`).on('end', () => {
//     console.log('Inserted into DB');
//   });
//   client.query("SELECT * FROM users").on('row', (row) => {
//     console.log(row);
//   });
// });

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

app.post('/restaurants', function(req,res){
  query.city = req.body.city;
  var queryRestaurants = query.restaurants + query.city + '&key=' + keys.google;

  request(queryRestaurants, function(error, resp, body){
    if(error) {
      console.log(error);
    }
    res.end(resp.body);
  })
});

app.post('/arts', function(req,res){
  query.city = req.body.city;
  var queryArts = query.museum + query.city + '&key=' + keys.google;


  request(queryArts, function(error, resp, body){
    if(error) {
      console.log(error);
    }
    res.end(resp.body);
  })
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

app.post('/yelpRestaurants', function(req, res) {
  // term, latitude, longitude, radius, limit=20, sort_by review_count, open_now=true, categories=ex)bars,French
  // use geolocation for lat and long, allow users to select categories, sent as req.body
  // use default to term="food", radius, limit, open_now=true, sort_by:review_count, more is better
  var yelpQuery = {
    term: 'food',
    location: req.body.location,
    latitude: req.body.lat,
    longitude: req.body.long,
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on...', port);
});
