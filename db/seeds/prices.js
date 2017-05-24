exports.seed = function(knex, Promise) {
  return knex('prices').del()
    .then(function () {
      return Promise.all([
        knex('prices').insert({
          food_id: 4,
          price: 9.99
        }),
        knex('prices').insert({
          food_id: 5,
          price: 9.99
        })
      ]);
    });
};
