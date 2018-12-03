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
     * Returns kingspay view
     *
     */
    kingsPay(req, res) {
        let viewData = {
            menuActive: 'home'
        };
        res.render('kings_pay', viewData);
    }

    pcdlOnline(req, res) {
        let viewData = {
            menuActive: 'home'
        };
        res.render('pcdl_online', viewData);
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
     * Returns view for changing body images
     *
     */
    getChangeBodyImagesView(req, res) {
        let viewData = {
            menuActive: 'home'
        };
        if (req.query.hasOwnProperty('id')) {
            viewData.imageId = req.query.id;
        }
        viewData.sliders = this.homeService.getCurrentBodyImages()
            .then(images => {
                viewData.images = images;
                res.render('admin_upload_body_image', { viewData, layout: 'admin_main' });
            })
            .catch(err => {
                req.flash('error', 'Unable to fetch current images');
                res.render('admin_upload_body_image', { layout: 'admin_main' });
            });
    }

    /**
     * Changes the slider images
     *
     */
    ChangeSliderImages(req, res) {

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

    /**
     * Changes the body images
     *
     */
    ChangeBodyImages(req, res) {

        let viewData = {
            menuActive: 'home'
        };
        this.homeService.uploadBodyImages(req, res)
            .then(images => {
                viewData.images = images;
                req.flash('success', 'Body image uploaded successfully');
                res.render('admin_upload_body_image', { viewData, layout: 'admin_main' });
            })
            .catch(err => {
                switch (err.constructor) {
                    case errors.NoSliderSelected:
                        res.redirect('/admin/change-body-images');
                        break;
                    default:
                        req.flash('error', 'Failed to upload body image');
                        res.render('admin_upload_body_image', { layout: 'admin_main' });
                        break;
                }
            });
    }
}

module.exports = HomeController;
