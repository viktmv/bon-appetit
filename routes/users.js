"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  function checkUser(email, password) {
  for(let user in users) {
    if(users[user].email === email  && bcrypt.compareSync(password, users[user].password)){
      return user;
    }
  }
  return "";
}

  router.get('/', (req, res) => {
    knex
      .select('*')
      .from('users')
      .then((results) => {
        res.json(results);
    });
  });


  router.get('/users/:id', (req, res) => {
    knex
      .select('*')
      .from('restaurants')
      .then((results) => {
        res.json(results);
      });
  });

  router.get('/menu/:id', (req, res) => {
    knex
      .select('*')
      .from('restaurant_menu')
      .then((results) => {
        res.join(results);
      });

  });

  router.get('/users/:id/active', (req, res) => {
    knex
      .select('*')
      .from('orders')
      .then((results) => {
        res.join(results);

      });
  })

  router.get('/restaurants', (req, res) => {

  });

  router.get('/restaurants/:id/active', (req, res) => {
    knex
      .select('*')
      .from('orders')
      .then((results) => {
        res.join(results);
      });
  })


  return router;

}








// middleware that is specific to this router
//router.use(function timeLog (req, res, next) {
  //console.log('Time: ', Date.now())
  //next()
//})
// define the home page route
//router.get('/', function (req, res) {
  //res.send('Birds home page')
//})
// define the about route
//router.get('/about', function (req, res) {
  //res.send('About birds')
//})
