'use strict';

exports.up = function (knex) {
    return knex.schema
        .table('rhapsody', function (table) {
            table.date('date').unique().alter();
        });
};

exports.down = function (knex) {
    return knex.schema
        .table('rhapsody', function (table) {
            table.dropColumn('date');
        });
};