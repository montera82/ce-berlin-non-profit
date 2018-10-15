var config = require('./app/config/config');

var dbConfig = {
    client: 'pg',
    connection: config.posgres.connection,
    pool: config.posgres.pool,
    migrations: {
        tableName: 'migrations'
    }
};

/**
 * Database settings.
 *
 * Setting the db settings in knexfile allows us to make use of the migrations.
 *
 * @type {Object} Database settings
 */
module.exports = {
    production: dbConfig,
    staging: dbConfig,
    development: dbConfig
};
