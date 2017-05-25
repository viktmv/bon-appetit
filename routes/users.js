'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get('/', (req, res) => {
    knex
      .select()
      .from('users')
      .then(users => {
        res.json(users);
      })
      .catch(() =>{
        res.status(500).send();
      });
  });

  // Get page of active orders
  router.get('/:id/orders', (req, res) => {
    res.send('User ' + req.params.id);
  });

  // Place order
  router.post('/:id/place', (req, res) => {
    res.send('Order placed for User ' + req.params.id);
  });

  return router;
}
