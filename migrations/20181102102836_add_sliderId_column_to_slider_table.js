
exports.up = function(knex, Promise) {
    return knex.schema
    .table('slider', function (table) {
        table.integer('slider_id');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
  .table('slider', function(table) {
      table.dropColumn('slider_id');
  });
};
