/**
 *  This file should be a standalone script that seeds your database,
 *  making testing interactions with your database much easier.
 *
 *  You should be able to run this file from Terminal with:
 *
 *    node db/seed.js
 *
 */
// 'use strict';
//
// const connection = require('./db.js');
//
// // Step 1: Drop old data
// connection.query('DROP TABLE interests', (err) => {
//   if (err) {
//     console.error('interests has already been dropped');
//   } else {
//     console.log('interests dropped');
//   }
// });
//
// connection.query('DROP TABLE users', (err) => {
//   if (err) {
//     console.error('users has already been dropped');
//   } else {
//     console.log('users dropped');
//   }
// });
//
// connection.query(
//   `CREATE TABLE IF NOT EXISTS "users" (
//     "id" SERIAL PRIMARY KEY,
//     "username" VARCHAR(50) DEFAULT NULL,
//     "city" VARCHAR(50) DEFAULT NULL
//   )`,
//   (err) => {
//     if (err) {
//       console.error('Error adding data');
//     } else {
//       console.log('Data added');
//     }
//   });
//
// connection.query(
//   `CREATE TABLE IF NOT EXISTS "interests" (
//     "id" SERIAL PRIMARY KEY,
//     "interest" VARCHAR(50) DEFAULT NULL,
//     "userId" INTEGER REFERENCES users
//   )`,
//   (err) => {
//     if (err) {
//       console.error('Error adding data');
//     } else {
//       console.log('Data added');
//     }
//   });
//
// // Step 2: Add data
//   connection.query(`INSERT INTO users (username, city) VALUES ('nikkig', 'Irvine')`, () => {
//       console.error('Insert into DB');
//   });
// 
// // connection.end();
//
