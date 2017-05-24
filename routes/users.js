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


  function checkRest(email, password) {
  for(let res in restaurants) {
    if(restaurants[res].email === email  && bcrypt.compareSync(password, restaurants[res].password)){
      return res;
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
      .from('resta_menu')
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