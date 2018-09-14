'use strict';

let config = require('app/config/config');
let knex = require('knex')({
    client: 'postgres',
    connection: config.posgres.connection,
    pool: config.posgres.pool
});

module.exports = knex;
