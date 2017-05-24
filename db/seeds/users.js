exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          name: 'Alice',
          email: 'test@user.com',
          password: '1111'
        }),
        knex('users').insert({
          name: 'Bob',
          email: 'test@user.com',
          password: '1111'
        }),
        knex('users').insert({
          name: 'Charlie',
          email: 'test@user.com',
          password: '1111'
        })
      ]);
    });
};
