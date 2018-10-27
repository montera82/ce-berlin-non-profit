'use strict';
let errors = require('app/errors');
let Slider = require('app/models/slider');
let Bookshelf = require('app/bookshelf');

let Sliders = Bookshelf.Collection.extend({
    model: Slider
});

class HomeService {

    /**
     * Home
     *
     * service constructor
     *
     * @constructor
     * @param {logger} logger instance of the logger
     */
    constructor(logger) {
        this.logger = logger;
    }

    /**
     * Handele upload of slider images
     */
    uploadSliderImages(req, res) {
        if (Object.keys(req.files).length == 0) {
            this.logger.error('No slider was selected for upload');
            throw new errors.NoSliderSelected('No slider was selected for upload');
        }
        let slider1 = req.files.slider1;
        let slider2 = req.files.slider2;
        let slider3 = req.files.slider3;

        if (slider1) {
            slider1.mv('public/sliders/'  + slider1.name, err => {
                if (err) {
                    this.logger.error('Failed to move slider 1');
                    throw err;
                }
            });
        }
        if (slider2) {
            slider2.mv('public/sliders/' + slider2.name, err => {
                if (err) {
                    this.logger.error('Failed to move slider 2');
                    throw err;
                }
            });
        }
        if (slider3) {
            slider3.mv('public/sliders/' + slider3.name, err => {
                if (err) {
                    this.logger.error('Failed to move slider 3');
                    throw err;
                }
            });
        }

        return Sliders.forge([
            { image_url: '/sliders/' + slider1.name },
            { image_url: '/sliders/' + slider2.name },
            { image_url: '/sliders/' + slider3.name },
        ])
        .invokeThen('save')
        .then( collection => {
            this.logger.info('Sliders uploaded successfully');
            return collection;
        })
        .catch(err => {
            this.logger.error('Failed to save image path' + err.message);
            throw err;
        });
    }
}

module.exports = HomeService;
