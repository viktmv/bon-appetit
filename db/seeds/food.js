exports.seed = function(knex, Promise) {
  return knex('food').del()
    .then(function () {
      return Promise.all([
        knex('food').insert({
          foodname: 'pizza',
          id: 4
        }),
        knex('food').insert({
          foodname: 'spaghetti',
          id: 5
        }),
        knex('food').insert({
          foodname: 'bagel'
        })
      ]);
    });
};
