'use strict';
let errors = require('app/errors');

class HomeController {
    /**
     * @constructor
     *
     * @param HomeService
     * @param logger
     */
    constructor(HomeService, logger) {
        this.homeService = HomeService;
        this.logger = logger;
    }

    /**
     * Home index
     *
     * @param req
     * @param res
     */
    index(req, res) {

        let viewData = {
            menuActive: 'home'
        };
        //call the Home service here to fetch stuffs from the DB e.t.c before redendering content
        res.render('home', viewData);

    }

    /**
     * Returns view for changing slider images
     *
     */
    getChangeSliderView(req, res) {

        let viewData = {
            menuActive: 'home'
        };
        if(req.query.hasOwnProperty('id')){
            viewData.sliderId = req.query.id;
        }
        this.homeService.getCurrentSliders()
            .then( collection => {
                viewData.sliders = collection.models;
                res.render('admin_upload_slider', { viewData, layout: 'admin_main'});
            })
            .catch( err => {
                req.flash('error', 'Unable to fetch current sliders');
                res.render('admin_upload_slider', {layout: 'admin_main'});
            });
    }

    /**
     * Changes the slider view
     *
     */
    ChangeSliderImage(req, res) {

        let viewData = {
            menuActive: 'home'
        };
        this.homeService.uploadSliderImages(req, res)
            .then( collections => {
                viewData.sliders = collections;
                req.flash('success', 'Sliders uploaded successfully');
                res.render('admin_upload_slider', {viewData, layout: 'admin_main'});
            })
            .catch( err => {
                switch (err.constructor) {
                    case errors.NoSliderSelected:
                        res.redirect('/admin/change-slider-images');
                        break;
                    default:
                        req.flash('error', 'Failed to upload sliders');
                        res.render('admin_upload_slider', { layout: 'admin_main'});
                        break;
                }
            });
    }
}

module.exports = HomeController;
