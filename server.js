'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';

const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const sass = require('node-sass-middleware');

const app = express();

// Query Builder
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
// Loggers
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each resource
const restaroutes = require('./routes/restaroutes');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');

app.use(session({
  name: 'session',
  keys: ['andrew_thomas_par_supa_secret', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Mount all resource routes
app.use('/users', usersRoutes(knex));
app.use('/restaurants', restaroutes(knex));
app.use('/', authRoutes(knex));
// ^^^^^^^^^ INITIAL SETUP - DO NOT MODIFY ANYTHING ABOVE THIS LINE ^^^^^^^^^^

app.listen(PORT, () => {
  console.log('Example app listening on port' + PORT);
});
