exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('food', function(table){
      table.dropColumn('price');
    }),
    knex.schema.createTable('prices', function(table){
      table.increments('id');
      table.integer('food_id').references('food.id');
      table.decimal('price');
    }),
    knex.schema.table('orders', function(table){
      table.integer('price').references('prices.id');
    })
  ])
};
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('food', function(table){
      table.decimal('price');
    }),
    knex.schema.dropTable('prices'),
    knex.schema.table('orders', function(table){
      table.dropColumn('price');
    })
  ])
};
