
exports.up = function(knex, Promise) {
    return knex.schema.hasTable('slider').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('slider', function (table) {
                table.bigincrements('id').primary();
                table.string('image_url');
                table.timestamps();
            });
        }
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('slider')
};
