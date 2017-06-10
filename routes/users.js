'use strict';

const express = require('express');
const router = express.Router();
// const twilio = require('../public/scripts/twilio');

const createOrder = (cart) => {
  const order = [];
  cart.foods.forEach((food) => {
    order.push({
      item_id: food.item_id,
      quantity: food.quantity
    });
  });
  return order;
};

// Calculates total cost of each order
const calculateTotal = (cart) => {
  let total = 0;
  cart.foods.forEach((food) => {
    total += (food.price * food.quantity);
  });
  // Adds tax to total. The total will not be rounded before database insertion (eg. 79.99999999999999999)
  return total * 1.13;
};

// Function to create message from order. String inserts the item name and quantity,
// pluralizes the name if the quantity is greater than 1. Seperates items with commas and replaces
// the last commas with 'and'
const createOrderMessage = (order) => {
  const messageArray = [];
  order.forEach((item) => {
    if (item.quantity > 1) {
      messageArray.push(`${item.quantity} ${item.name}s`);
    } else {
      messageArray.push(`${item.quantity} ${item.name}`);
    }
  });
  return messageArray.join(', ').replace(/,(?=[^,]*$)/, ' and');
};

module.exports = (knex) => {
  // All routes get prepended with /users
  router.get('/menu', (req, res) => {
    knex
      .select()
      .from('foods')
      .then((foods) => {
        let user = req.session.username || '';

        res.render('menu', {
          user,
          foods
        });
      })
      .catch(() => {
        res.status(500).send();
      });
  });

  // Post request on order submission. Knex db insertion into orders table and
  // products_menu table.
  router.post('/order', (req, res) => {
    // Checks for userID in cookie/session if user validation can be implemented
    // Const userID        = req.session.user_id
    const userID = 1; // this is Dong's userID *DO NOT CHANGE FOR TESTING*
    const cart = JSON.parse(req.body.cart);
    const total = calculateTotal(cart);
    const orderItems = createOrder(cart);
    const message = createOrderMessage(cart.foods);
    let order_id;

    // Inserts data into orders table and returns the order_id
    knex('orders')
      .returning('id')
      .insert([{
        user_id: userID,
        total_price: total
      }])
      .then((order_id) => {
        console.log(`Successfull order submission! The order_id is: ${order_id}`);
        return order_id;
      })
      .then((order_id) => {
        orderItems.map((orderItems) => {
          orderItems['order_id'] = Number(order_id);
        });
        orderItems.forEach(item => {
          knex('food_orders')
            .insert(item).then(console.log);
        });
        return order_id;
      })
      .then((order_id) => {
        // ACTIVATE THIS TWILIO MESSAGE WHEN WE DEMO
        // COMMENTED OUT FOR TESTING PURPOSES

        // twilio.message('Dong', message, 'Ice Scream');

        // Hard coded name as "Dong" and time as "10"
        // twilio.message('Dong', 'Ice Scream', 'no time', `http://localhost:8080/users/${userID}/orders`);
        //  THIS IS WHERE W CAN IMPLEMENT THE CALL FUNCTION
        res.json({url: `order/${order_id}`});
        // res.redirect('/users/order/' + order_id);
      })
      .catch((err, result) => {
        if (err) {
          return console.log(`Error: ${err}`);
        } else {
          console.log(result);
          console.log(`Successfull order submission! The order_id is: ${order_id}`);
        }
      });
  });

  router.get('/:id/orders', (req, res) => {
    // Checks for userID in cookie/session if user validation can be implemented
    // const userID        = req.session.user_id
    const userID = req.params.id; // this is Dong's userID *DO NOT CHANGE FOR TESTING*

    // Inserts data into orders table and returns the order_id
    knex.from('food_orders')
      .innerJoin('orders', 'food_orders.order_id', 'orders.id')
      .innerJoin('foods', 'food_orders.item_id', 'foods.id')
      .select()
      .where('user_id', '=', userID)
      .then(data => {
        let orders = {};
        data.forEach(item => {
          let id = item.order_id;
          orders[id] ? orders[id].push(item) : orders[id] = [item];
        });
        res.render('user_orders', {orders, user: userID});
      });
  });

  // Render cart when user clicks on cart icon
  router.get('/cart', (req, res) => {
    let user = req.session.username || '';
    res.render('cart', {
      user
    });
  });

  // Render a specific order
  router.get('/order/:orderID', (req, res) => {
    const orderID = req.params.orderID;
    console.log('GET ORDER', orderID);

    return knex.from('food_orders')
      .innerJoin('orders', 'food_orders.order_id', 'orders.id')
      .innerJoin('foods', 'food_orders.item_id', 'foods.id')
      .select()
      .where('order_id', '=', orderID)
      .then((allFoods) => {
        let user = req.session.username || '';
        const locals = {
          foods: allFoods,
          orderID: orderID,
          user
        };
        if (locals.foods.length === 0) {
          res.redirect('/users/menu');
        } else {
          res.render('order_confirmation', locals);
        }
      })
      .catch((err) => {
        console.log('Knex query failed', err);
      });
  });
  return router;
};
