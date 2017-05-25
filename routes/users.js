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
  return router;
}
