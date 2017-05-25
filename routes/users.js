"use strict";

const express = require('express');
const router = express.Router();
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
  router.get("/menu", (req, res) => {
    knex
    .select()
    .from('foods')
    .then((rows) => {
      const locals = {
        foods: rows
      }
      res.render('menu', locals);
    })
    .catch((err) =>{
      res.status(500).send();
    });
    //
    //   return knex('foods')
    //     .select()
    //     .then((allFoods)) => {
    //       const locals = {
    //         foods: allFoods
    //       };
    //       res.render('menu', locals);
    //     })
    // .catch((err) => {
    //   console.log("knee query failed", err)
    // })
  });
return router;
}
