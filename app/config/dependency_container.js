'use strict';

let config = require('app/config/config');
let serviceLocator = require('app/lib/service_locator');
let Logger = require('app/lib/logger');
let RhapsodyController = require('app/controllers/rhapsody_realities');
let RhapsodyService = require('app/services/rhapsody_realities');

/**
 * Creates an instance of the Rhapsody controller
 */
serviceLocator.register('rhapsodyController', (serviceLocator) => {
    let rhapsodyService = serviceLocator.get('rhapsodyService');
    let logger = serviceLocator.get('logger');

    return new RhapsodyController(rhapsodyService, logger);
});

/**
 * Creates an instance of the Rhapsody service
 */
serviceLocator.register('rhapsodyService', (serviceLocator) => {

    let logger = serviceLocator.get('logger');

    return new RhapsodyService(logger);
});

/**
 * Creates an instance of the logger
 */
serviceLocator.register('logger', () => {

    return Logger.create(config.logging);
});

module.exports = serviceLocator;
