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




  return router;

}