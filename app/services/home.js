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
        if (Object.keys(req.files).length === 0) {
            this.logger.error('No slider was selected for upload');
            throw new errors.NoSliderSelected('No slider was selected for upload');
        }
        if (req.files.hasOwnProperty('slider')) {
            let slider = req.files.slider;
            slider.mv('public/sliders/' + slider.name, err => {
                if (err) {
                    this.logger.error('Failed to move slider');
                    throw err;
                }
            });
            return new Slider().save({ image_url: '/sliders/' + slider.name }, { method: 'insert' })
                .then(collection => {
                    this.logger.info('Sliders uploaded successfully');
                    return collection;
                })
                .catch(err => {
                    this.logger.error('Failed to save image path' + err.message);
                    throw err;
                });
        }
    }

    /**
     * Retrieves the last three image urls as the currnet sliders
     */
    getCurrentSliders() {
        return new Slider().query(qb => {
            qb.orderBy('id', 'desc')
                .limit(3);
        })
            .fetchAll()
            .then(sliders => {
                this.logger.info('Current sliders fetched successfully');
                return sliders;
            })
            .catch(err => {
                this.logger.error('Failed to fetch current sliders: ' + err);
                throw err;
            })
    }
}

module.exports = HomeService;
