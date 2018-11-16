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
            let slider_id = req.query.id;
            slider.mv('public/sliders/' + slider.name, err => {
                if (err) {
                    this.logger.error('Failed to move slider');
                    throw err;
                }
            });
            return new Slider({ id: slider_id }).save({ image_url: '/sliders/' + slider.name }, { method: 'update' })
                .then(() => {
                    this.logger.info('Sliders uploaded successfully');
                    //Call method responsible for getting last three image urls as current sliders
                    return this.getCurrentSliders()
                        .then(collections => {
                            return collections;
                        })
                        .catch(err => {
                            this.logger.error('Unable to fetch current sliders');
                            throw err;
                        });
                })
                .catch(err => {
                    this.logger.error('Failed to save image path ' + err.message);
                    throw err;
                });
        }
    }

    /**
     * Retrieves the last three image urls as the current sliders
     */
    getCurrentSliders() {
        return new Slider()
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
