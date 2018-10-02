'use strict';

let config = require('app/config/config');

module.exports.setup = function setup(app, serviceLocator) {

    let rhapsodyController = serviceLocator.get('rhapsodyController');
    let homeController = serviceLocator.get('homeController');
    app.get('/', (req, res, next) => homeController.index(req, res, next));
    app.get('/rhapsody-realities',  (req, res, next) => rhapsodyController.index(req, res, next));
};
