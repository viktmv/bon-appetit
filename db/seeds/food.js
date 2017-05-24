exports.seed = function(knex, Promise) {
  return knex('food').del()
    .then(function () {
      return Promise.all([
        knex('food').insert({
          foodname: 'pizza',
          price: 9.99
        }),
        knex('food').insert({
          foodname: 'spaghetti',
          price: 9.99
        }),
        knex('food').insert({
          foodname: 'bagel',
          price: 9.99
        })
      ]);
    });
};
