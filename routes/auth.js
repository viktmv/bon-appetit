const express = require('express');
const router = express.Router();

// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (knex) => {
  // Home page
  router.get('/', (req, res) => {
    let user;
    if (req.session.username) user = req.session.username;
    res.status(200).render('index.ejs', {user});
  });

  // Login page
  router.get('/login', (req, res) => {
    let user;
    if (req.session.username) user = req.session.username;
    res.status(200).render('login.ejs', {user});
  });

  // Login handler
  router.post('/login', (req, res) => {
    let username = req.body.username;
    let passwordText = req.body.password;
    if (!username) return res.sendStatus(403);
    if (!passwordText) return res.sendStatus(403);

    knex('users')
    .where({
      username
    })
    .select()
    .then((userData) => {
      if (userData.length === 0) return res.sendStatus(404);
      let {username, password} = userData[0];
      bcrypt.compare(passwordText, password, function(err, result) {
        if (!result) return res.sendStatus(403);
        req.session.username = userData[0].username;
        res.status(200).redirect('/users/menu');
      });
    })
    .catch(err => {
      console.log('something hrouterend', err);
      res.sendStatus(500);
    });
  });

  // Logout
  router.post('/logout', (req, res) => {
    req.session = null;
    res.sendStatus(200);
  });

  // Register page
  router.get('/register', (req, res) => {
    let user;
    if (req.session.username) user = req.session.username;

    res.render('register.ejs', {user});
  });

  // Register handler
  router.post('/register', (req, res) => {
    let {username, email, password} = req.body;

    bcrypt.hash(password, saltRounds, function(err, hash) {
      knex('users')
        .insert({username, email, password: hash})
        .then(() => { if (!err) res.status(200).redirect('/'); })
        .catch(() => res.sendStatus(500));
    });
  });
  return router
};
