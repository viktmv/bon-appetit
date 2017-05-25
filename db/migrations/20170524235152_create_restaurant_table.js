
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('restaurant', function(table) {
      table.increments().primary();
      table.string('name');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('restaurant')
  ])
};
