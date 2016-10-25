'use strict';
const pg = require('pg');

pg.defaults.ssl = true;
const DB_URL = "postgres://ubdstfwleaooic:B0vukbSMzhukIY0A5yYDQ1SOgi@ec2-107-20-198-81.compute-1.amazonaws.com:5432/degbha8ooifpbu";
// Instantiate new pg client (client will read connection from pg cli tools)
const client = new pg.Client(DB_URL);
client.connect();

module.exports = client;
