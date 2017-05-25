
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('foods', function (table) {
      table.increments().primary();
      table.integer('restaurant_id').unsigned()
      table.foreign('restaurant_id').references('restaurant_id');
      table.string('name');
      table.string('description');
      table.decimal('price');
      table.string('image_url');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('items')
  ])
};
