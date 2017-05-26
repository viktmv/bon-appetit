'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  // all routes are prepended with /restaurants

  // get /order_status will render the order status page for the employee checking on new orders

  router.get('/order_status', (req, res) => {
    const locals = {};
    return knex('orders')
    .join('users', 'orders.user_id', 'users.id')
    .select()
    .then(function(result) {
      locals.usersOrders = result;
    }).then(function() {
      return knex('food_orders')
      .join('orders', 'food_orders.order_id', 'orders.id')
      .join('foods', 'foods_orders.item_id', 'foods.id')
      .select()
      .then(function(result) {
        locals.foodOrders = result;
        res.render('order_status', locals);
      });
    });
  });

  // For now just renders json
  // Should render restaurant login file
  router.get('/', (req, res) => {
    res.status(200).render('restaurants')
  });

  // Render active orders for logged-in restaurant owner
  router.get('/:id/orders', (req, res) => {
    knex
      .select('*')
      .from('restaurant')
      .then((results) => {
        res.render('orders_status.ejs', {results});
      });
  });

  // Handle request for order completion
  router.post('/complete', (req, res) => {
    console.log(req.body)
    res.send('Order completed, restaurant ' + req.body.orderID);
  });

  // Login request
  // TODO: Connect to DB for password checking
  router.post('/login', (req, res) => {
    let restaname = req.body.restaname;
    let password = req.body.password;

    if (!restaname) return res.sendStatus(403);
    if (!password) return res.sendStatus(403);

    knex('restaurant')
    .where({
      restaname,
      password
    })
    .select()
    .then((restaData) => {
      if (restaData.length === 0) return res.sendStatus(404)
      req.session.restaname = restaData[0].restaname
      res.status(200).send(restaData)
    })
    .catch(err => {
      console.log('something happend', err)
      res.sendStatus(500)
    })
  });

  // Logout request
  router.post('/logout', (req, res) => {
    req.session = null;
    res.sendStatus(200)
  });

  return router;
}
