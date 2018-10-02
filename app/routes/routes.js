'use strict';

let config = require('app/config/config');

module.exports.setup = function setup(app, serviceLocator) {

    let rhapsodyController = serviceLocator.get('rhapsodyController');
    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/rhapsody-realities',  (req, res, next) => rhapsodyController.index(req, res, next));
};
