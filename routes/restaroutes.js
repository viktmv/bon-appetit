'use strict';

const express = require('express');
const router = express.Router();
const twilio = require('../public/scripts/twilio');

module.exports = (knex) => {
  // all routes are prepended with /restaurants

  router.post('/order_status/:id', (req, res) => {
    const orderid = req.params.id;
    const time = req.body.val;

    return knex('orders')
    .where('orders.id', '=', orderid)
    .update({time: time})
    .then(function() {
      const sms = {};
      return knex('orders')
      .innerJoin('users', 'orders.user_id', 'users.id')
      .select('users.first_name', 'orders.time')
      .where('orders.id', '=', orderid)
      .then(function(result) {
        sms.user = result;
        console.log(result)
        // Console log the db query
        // twilio.message(sms.user[0].first_name, 'Ice Sream', sms.user[0].time, `http://localhost:8080/users/${sms.user[0].id}/orders`);
      });
    })
    .then(function() {
      res.redirect('/restaurants/order_status');
    });
  });

  router.get('/order_status', (req, res) => {
    return knex('orders')
      .join('users', 'orders.user_id', 'users.id')
      .select()
      .then(function(userOrders) {
        return knex('food_orders')
          .innerJoin('orders', 'food_orders.order_id', 'orders.id')
          .innerJoin('foods', 'food_orders.item_id', 'foods.id')
          .select()
          .then(function(foodOrders) {

            let data = {};
            data.orders = {};
            userOrders.forEach(order => {
              data.name = `${order.first_name} ${order.last_name}`;
            });

            foodOrders.forEach(order => {
              let id = order.order_id;
              if (data.orders[id]) {
                data.orders[id].price = order.total_price;
                data.orders[id].items.push(order.name);
              }
              else {
                data.orders[id] = { price: order.total_price, items: [order.name] };
              }
            });
            res.render('orders_status', {data});
          });
      });
  });


  router.post('/done/:id', (req, res) => {

    const orderid = req.params.id;

    return knex('orders')
        .where('orders.id', '=', orderid)
        .update({complete: true})
        .then(function() {
          const sms = {};
          return knex('orders')
          .innerJoin('users', 'orders.user_id', 'users.id')
          .select('users.first_name', 'users.id')
          .where('orders.id', '=', orderid)
          .then(function(result) {
            sms.user = result;
          }).then(function () {
            // twilio.complete(sms.user[0].first_name, 'Ice Scream', `http://localhost:8080/users/${sms.user[0].id}/orders`);
          }).then(function() {
            res.redirect('/restaurants/order_status');
          });
        });
  });

  router.get('/', (req, res) => {
    res.status(200).render('restaurants');
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
      if (restaData.length === 0) return res.sendStatus(404);
      req.session.restaname = restaData[0].restaname;
      res.redirect('/restaurants/order_status');
    })
    .catch(err => {
      console.log('something happend', err);
      res.sendStatus(500);
    });
  });

  // Logout request
  router.post('/logout', (req, res) => {
    req.session = null;
    res.sendStatus(200);
  });

  return router;
};
