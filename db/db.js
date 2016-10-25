const pg = require('pg');

// Instantiate new pg client (client will read connection from pg cli tools)
const client = new pg.Client();

const connection = client.connect((err) => {
  if (err) {
    console.log('Cannot connect to DB ', err);
  } else {
    console.log('Connected to PG DB!');
  }
});

module.exports = connection;
