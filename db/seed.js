/**
 *  This file should be a standalone script that seeds your database,
 *  making testing interactions with your database much easier.
 *
 *  You should be able to run this file from Terminal with:
 *
 *    node db/seed.js
 *
 */
'use strict';

const connection = require('./db.js');

// Step 1: Drop old data
connection.query('DROP TABLE stuff', (err) => {
  if (err) {
    console.error('stuff has already been dropped');
  } else {
    console.log('stuff dropped');
  }
});

connection.query('DROP TABLE users', (err) => {
  if (err) {
    console.error('users has already been dropped', err);
  } else {
    console.log('users dropped');
  }
});

connection.query(
  `CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(50) DEFAULT NULL,
    "password" VARCHAR(1000) DEFAULT NULL
  )`,
  (err) => {
    if (err) {
      console.error('Error adding data');
    } else {
      console.log('Data added to users');
    }
  });

connection.query(
  `CREATE TABLE IF NOT EXISTS "stuff" (
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR(300) DEFAULT NULL,
    "name" VARCHAR(300) DEFAULT NULL,
    "city" VARCHAR(300) DEFAULT NULL,
    "userid" INTEGER REFERENCES users
  )`,
  (err) => {
    if (err) {
      console.error('Error adding data');
    } else {
      console.log('Data added to stuff');
    }
  });

// Step 2: Add data
  // connection.query(`INSERT INTO users (username, city) VALUES ('nikkig', 'Irvine')`, () => {
  //     console.error('Insert into DB');
  // });

// connection.end();

