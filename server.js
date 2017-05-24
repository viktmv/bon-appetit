"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const session     = require('express-session');
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
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
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

app.get("/", (req, res) => {
  res.render("index");
});

// app.post('/login', (req, res) => {
//   if (!req.session.user_id || !req.session.restaurant_id) {
//     res.status(200).redirect('/')
//   } else if (req.session.user_id && !req.sesssion.restaurant_id) {
//     res.redirect('/restaurants')
//   } else {
//     res.redirect('/admin')
//   }
// });

// logout will destroy cookie session
app.post('/logout', (req, res) => {
  req.session = null
  res.redirect('/login')
});

// // If user login credentials valid, redirect to menu page to create order.
// // If login credentials invalid or login fails, redirect to homepage
// app.post('/login', (req, res) => {
//   const email = req.body.email
//   const password = req.body.password
//   let user_id = ""
//   // if (user && (bcrypt.compareSync(password, user.password) || user.password === password)) {
//   //   user_id = user.id
//   //   req.session.user_id = user_id
//   //   res.redirect('/user/menu')
//   // } else {
//   //   res.status(401).redirect('/')
//   // }
// });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
