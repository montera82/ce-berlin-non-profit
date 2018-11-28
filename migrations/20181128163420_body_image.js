
exports.up = function(knex, Promise) {
    return knex.schema.hasTable('body_image').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('body_image', function (table) {
                table.bigincrements('id').primary();
                table.string('image_url');
                table.string('display_text');
                table.text('learn_more_url');
                table.timestamps();
            });
        }
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('body_image')

};
