'use strict';

let config = require('app/config/config');

module.exports.setup = function setup(app, serviceLocator) {

    let rhapsodyController = serviceLocator.get('rhapsodyController');
    let homeController = serviceLocator.get('homeController');

    //Routes for anonymous users
    app.get('/', (req, res, next) => homeController.index(req, res, next));
    app.get('/rhapsody-realities',  (req, res, next) => rhapsodyController.index(req, res, next));
    app.get('/church-service', function (req, res, next) {
        let viewData = {
            menuActive: 'churchService'
        };
        res.render('church_service', viewData);
    });

    app.get('/kings-pay', (req, res, next) => homeController.kingsPay(req, res, next));
    

    //Admin Routes
    app.get('/admin/',  function (req, res, next) {
        res.render('admin_dashboard', {layout : 'admin_main'});
    });
    app.get('/admin/add-rhapsody-realities',  (req, res, next) => rhapsodyController.addNewView(req, res, next));
    app.post('/admin/add-rhapsody-realities',(req, res, next) => rhapsodyController.save(req, res, next));
    app.get('/admin/list-rhapsody-realities',  (req, res, next) => rhapsodyController.list(req, res, next));
    app.get('/admin/edit-rhapsody-realities/:id',  (req, res, next) => rhapsodyController.editView(req, res, next));
    app.post('/admin/edit-rhapsody-realities/:id',  (req, res, next) => rhapsodyController.update(req, res, next));
    app.get('/admin/change-slider-images',  (req, res, next) => homeController.getChangeSliderView(req, res, next));
};
