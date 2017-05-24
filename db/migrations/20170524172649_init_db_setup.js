exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('restaurants', function(table){
      table.increments('id');

      table.string('name');
      table.string('username');
      table.string('password');
    }),
    knex.schema.createTable('food', function(table){
      table.increments('id');

      table.string('foodname');
      table.decimal('price');
    })
  ])
};
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('restaurants'),
    knex.schema.dropTable('food')
  ])
};
