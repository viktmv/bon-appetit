exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('food_orders', function(table) {
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('orders.id');
      table.integer('item_id').unsigned();
      table.foreign('item_id').references('foods.id');
      table.integer('quantity');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('food_orders')
  ])
};
