"use strict";

const express = require('express');
const router  = express.Router();
// const async   = require('async');

// Takes in localStorage and creates an array with item_id and item_quantity
// const createOrder = (cart) => {
//   const order = [];
//   cart.products.forEach((product) => {
//     order.push(
//       {
//         item.id: product.item_id,
//         quantity: product.quantity
//       }
//     );
//   })
//   return order;
// }

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });
  return router;
}

module.exports = (knex) => {
  //  GET request to query db and return all products and render them in menu form
  router.get('/menu', (req, res) => {
    return knex('food')
      .select()
      .then((allFood) => {
        const locals = {
          food: allFood
        };
          res.render('menu', locals);
      })
      .catch((err) => {
        console.log("Knex query failed", err)
      })
  });
