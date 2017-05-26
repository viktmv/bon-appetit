'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');

const createOrder = (cart) => {
  const order = []
  cart.foods.forEach((food) => {
    order.push(
      {
        item_id: food.item_id,
        quantity: food.quantity
      }
    );
  })
  return order;
}

// Calculates total cost of each order
const calculateTotal = (cart) => {
  let total = 0;
  cart.foods.forEach((food) => {
    total += (food.price * food.quantity)
  })
  // Adds tax to total. The total will not be rounded before database insertion (eg. 79.99999999999999999)
  return total * 1.13;
}

// Function to create message from order. String inserts the item name and quantity,
// pluralizes the name if the quantity is greater than 1. Seperates items with commas and replaces
// the last commas with 'and'
const createOrderMessage = (order) => {
  const messageArray = []
  order.forEach((item) => {
    if (item.quantity > 1) {
      messageArray.push(`${item.quantity} ${item.name}s`)
    } else {
      messageArray.push(`${item.quantity} ${item.name}`)
    }
  })
  return messageArray.join(', ').replace(/,(?=[^,]*$)/, ' and')
}

module.exports = (knex) => {
  // All routes get prepended with /users
  router.get('/menu', (req, res) => {
    knex
      .select()
      .from('foods')
      .then((foods) => {
        let user = req.session.username || ''

        res.render('menu', {user, foods});
      })
      .catch(() =>{
        res.status(500).send();
      });
  });

// Post request on order submission. Knex db insertion into orders table and
// products_menu table.
router.post('/order', (req, res) => {
  // Checks for userID in cookie/session if user validation can be implemented
  // const userID        = req.session.user_id
  const userID        = 4; // this is Dong's userID *DO NOT CHANGE FOR TESTING*
  const cart          = JSON.parse(req.body.cart)
  const total         = calculateTotal(cart)
  const orderItems    = createOrder(cart)
  const message       = createOrderMessage(cart.foods)
  let order_id;

  // Inserts data into orders table and returns the order_id
      knex('orders')
       .returning('id')
        .insert([{user_id: userID, total_price: total}])
        .then((order_id) => {
          console.log(order_id)
          return order_id
        })
        .then (order_id => console.log(`Successful order submission! The order_id is: ${order_id}`))
        .catch((err, result) => {
          if(err){
            return console.log(`Error: ${err}`);
          } else {
            console.log(result);
            console.log(`Successfull order submission! The order_id is: ${order_id}`);
            // res.json({url: `/user/${order_id}`});
          }
        });
    // },
    // (data, callback) => {
    //   // Sets the orderID, which gets called on redirect in the url. Order_id is added to
    //   // each item before insertion into product_order table.
    //   order_id = data[0]
    //   orderItems.map((orderItems) => {
    //     orderItems['order_id'] = order_id
    //   })
    //   console.log('Order items', orderItems);
    //   // knex batch insert requires an array.
    //   return knex.batchInsert('food_orders', orderItems)
    //     .then(response => callback(null, "done"))
    //     .catch(callback);
    // },
  // ], (err, result) => {
    // if(err){
      // return console.log(`Error: ${err}`);
    // } else {
      // console.log(`Successfull order submission! The order_id is: ${order_id}`);
      // res.json({url: `/user/${order_id}`});
    // }
  // });
});

  // Render cart when user clicks on cart icon
  router.get('/cart', (req, res) => {
    let user = req.session.username || ''
    res.render('cart', {user});
  })

  // Render a specific order
  router.get('/:orderID', (req, res) => {
    const orderID = Number(req.params.orderID)
    return knex.from('food_orders')
      .innerJoin('orders', 'food_orders.order_id', 'orders.id')
      .innerJoin('products', 'food_orders.item_id', 'foods.id')
      .select(orderID, 'foods.name', 'foods.price', 'food_orders.quantity', 'orders.time')
      .where('order_id', '=', orderID)
      .then((allFoods) => {
        const locals = {
          products: allFoods,
          orderID: orderID
        };
          if (locals.products.length === 0) {
            res.redirect('/user/menu');
          } else {
            res.render('order_confirmation', locals);
          }
      })
      .catch((err) => {
        console.log("Knex query failed", err)
      })
      res.render('order_confirmation', orderConfirm);
  })
  return router;
}
