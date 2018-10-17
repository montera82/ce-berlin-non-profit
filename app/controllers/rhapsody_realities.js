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
    addNewView(req, res) {

        res.render('admin_add_rhapsody', { layout: 'admin_main' });
    }

    save(req, res, next) {
        let body = req.body;

        // Validate Form Input
        let error = this.rhapsodyService.ValidateRhapsodyData(req);
        if (error) {
            this.logger.error('Validation Error: ', error);
            let errorMessages = error.map( item => item.msg );
            req.flash('error', errorMessages[0]);
            res.render('admin_add_rhapsody', { layout: 'admin_main'});
        }

        return this.rhapsodyService.createRhapsody(body)
                .then(() => {
                    req.flash('success', 'saved successfully!')
                    res.render('admin_add_rhapsody', { layout: 'admin_main' });
                })
                .catch((err) => {
                    req.flash('error', 'saving failed!')
                    res.render('admin_add_rhapsody', { layout: 'admin_main' });
                });
    }

    /**
    * rhapsody list
    *
    * @param req
    * @param res
    */
    list(req, res) {

        res.render('admin_list_rhapsody', { layout: 'admin_main' });

    }
}

module.exports = RhapsodyController;
