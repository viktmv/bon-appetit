exports.seed = function(knex, Promise) {
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert({
          name: 'Italian',
          username: 'italiano',
          password: '1111'
        }),
        knex('restaurants').insert({
          name: 'bakery',
          username: 'bakeoff',
          password: '2222'
        })
      ]);
    });
};
