'use strict';

const APP_NAME = 'church';
let config = {
    environment: process.env.NODE_ENV,
    appName: APP_NAME,
    webserver: {
        port: process.env.PORT || '3001'
    },
    logging: {
        file: process.env.LOG_PATH || '/tmp/church.log',
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_ENABLE_CONSOLE || true
    },
    posgres: {
        connection: {
            host: process.env.DB_HOST || 'postgres',
            port: process.env.DB_PORT || '5432',
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            debug: process.env.DATABASE_DEBUG ? ['ComQueryPacket'] : false
        },
        pool: {
            min: (process.env.DATABASE_POOL_MIN) ? parseInt(process.env.DATABASE_POOL_MIN) : 2,
            max: (process.env.DATABASE_POOL_MAX) ? parseInt(process.env.DATABASE_POOL_MAX) : 2
        }
    }, 
    pagination: {
        default_limit: 2,
        default_offset: 0,
        max_limit: 50
    },
};

module.exports = config;
