'use strict';
let errors = require('app/errors');

class HomeController {
    /**
     * @constructor
     *
     * @param homeService
     * @param logger
     */
    constructor(homeService, logger) {
        this.homeService = homeService;
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
        this.homeService.getCurrentSliders()
            .then(sliders => {
                viewData.sliders = sliders;
                res.render('home', { viewData });
            })
            .catch(err => {
                req.flash('error', 'Unable to fetch sliders');
                res.render('home', { viewData });
            });
    }

    /**
     * Returns view for changing slider images
     *
     */
    getChangeSliderView(req, res) {

        let viewData = {
            menuActive: 'home'
        };
        if (req.query.hasOwnProperty('id')) {
            viewData.sliderId = req.query.id;
        }
        viewData.sliders = this.homeService.getCurrentSliders()
            .then(sliders => {
                viewData.sliders = sliders;
                res.render('admin_upload_slider', { viewData, layout: 'admin_main' });
            })
            .catch(err => {
                req.flash('error', 'Unable to fetch current sliders');
                res.render('admin_upload_slider', { layout: 'admin_main' });
            });
    }

    /**
     * Changes the slider images
     *
     */
    ChangeSliderImage(req, res) {

        let viewData = {
            menuActive: 'home'
        };
        this.homeService.uploadSliderImages(req, res)
            .then(sliders => {
                viewData.sliders = sliders;
                req.flash('success', 'Sliders uploaded successfully');
                res.render('admin_upload_slider', { viewData, layout: 'admin_main' });
            })
            .catch(err => {
                switch (err.constructor) {
                    case errors.NoSliderSelected:
                        res.redirect('/admin/change-slider-images');
                        break;
                    default:
                        req.flash('error', 'Failed to upload sliders');
                        res.render('admin_upload_slider', { layout: 'admin_main' });
                        break;
                }
            });
    }
}

module.exports = HomeController;
