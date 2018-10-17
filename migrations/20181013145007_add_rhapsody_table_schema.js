'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.hasTable('rhapsody').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('rhapsody', function (table) {
                table.bigincrements('id').primary();
                table.string('title');
                table.string('opening_verse');
                table.text('body');
                table.text('confession');
                table.string('further_scripture');
                table.string('one_year_bible_plan');
                table.date('date');
                table.string('lang', 10);
                table.timestamps();
            });
        }
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('rhapsody')
};
