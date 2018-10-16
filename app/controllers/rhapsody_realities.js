'use strict';

class RhapsodyController {
    /**
     * @constructor
     *
     * @param rhapsodyService
     * @param logger
     */
    constructor(rhapsodyService, logger) {
        this.rhapsodyService = rhapsodyService;
        this.logger = logger;
    }

    /**
     * rhapsody index
     *
     * @param req
     * @param res
     */
    index(req, res) {

        let viewData = {
            menuActive: 'rhapsody'
        };

        //call the rhapsody service here to fetch rhapsodies from the DB e.t.c before redendering content
        res.render('rhapsody_realities', viewData);

    }

    /**
     * Form to add a new rhapsody into the database
     * 
     * @param req
     * @param res 
     */
    addNew(req, res) {

        res.render('admin_add_rhapsody', {layout : 'admin_main'});
    }

     /**
     * rhapsody create
     *
     * @param req
     * @param res
     */
    create(req, res) {

        let viewData = {
            menuActive: 'rhapsody'
        };

        //call the rhapsody service here to fetch rhapsodies from the DB e.t.c before redendering content
        res.render('add_rhapsody_form', viewData);
        
    }
}

module.exports = RhapsodyController;
