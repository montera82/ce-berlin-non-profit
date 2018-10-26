'use strict';

class HomeController
{
    /**
     * @constructor
     *
     * @param HomeService
     * @param logger
     */
    constructor(HomeService, logger)
    {
        this.HomeService = HomeService;
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
    getChangeSlider(req, res) {

        let viewData = {
            menuActive: 'home'
        };
        res.render('admin_upload_slider', {layout: 'admin_main'});
    }
}

module.exports = HomeController;
