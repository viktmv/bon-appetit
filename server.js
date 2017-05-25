'use strict';

require('dotenv').config();

const PORT        = process.env.PORT || 8080;

const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const session     = require('express-session');
const sass        = require("node-sass-middleware");

const app         = express();
//const express     = require('express');

const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const restaroutes = require("./routes/restaroutes");
const usersRoutes = require("./routes/users");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");

// Dong -  Cookie session settings to keep track of the userID
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'andrew_thomas_par_supa_secret',
  resave: false,
  saveUninitialized: false
}))

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
app.use("/restaurants", restaroutes(knex));

// Home page

app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.post('/login', (req, res) => {
  res.sendStatus(403)
});

// logout will destroy cookie session
app.post('/logout', (req, res) => {
  req.session = null
  res.redirect('/')
});


app.listen(PORT, () => {
  console.log('Example app listening on port' + PORT);
});
