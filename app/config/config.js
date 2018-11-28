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
        default_limit: 10,
        default_offset: 0,
        max_limit: 50
    },
    seedSliderImages: {
        image_url_1: '/sliders/placeholder_image_1.jpg',
        image_url_2: '/sliders/placeholder_image_2.png',
        image_url_3: '/sliders/placeholder_image_3.jpg'
    },
    seedBodyImages: {
        image_url: {
            1: '/sliders/placeholder_image_1.jpg',
            2: '/sliders/placeholder_image_2.png'
        },
        display_text: {
            1: 'We provide branding & marketing services mostly as digital solutions to match the reality of web design, development & branding. Our clients\' trust proves that we chose the right path when we began to offer these services.',
            2: 'We provide branding & marketing services mostly as digital solutions to match the reality of web design, development & branding. Our clients\' trust proves that we chose the right path when we began to offer these services.',
        },
        learn_more_url: {
            1: 'https://learn_more.org',
            2: 'https://learn_more.org'
        }
    }
};

module.exports = config;
