exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table){
      table.increments('id');

      table.string('user_id').references('users.id');
      table.string('rest_id').references('restaurants.id');
      table.string('food_id').references('food.id');
    }),
    knex.schema.createTable('resta_menu', function(table){
      table.increments('id');

      table.string('rest_id').references('restaurants.id');
      table.string('food_id').references('food.id');
    })
  ])
};
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('resta_menu')
  ])
};
