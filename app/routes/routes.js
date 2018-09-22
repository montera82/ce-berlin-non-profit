'use strict';

let config = require('app/config/config');

module.exports.setup = function setup(app, serviceLocator) {

    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/rhapsody-realities', function (req, res) {
        res.render('rhapsody_realities');
    });
};
