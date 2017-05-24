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
