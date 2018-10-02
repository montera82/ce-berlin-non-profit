'use strict';

class RhapsodyController
{
    /**
     * @constructor
     *
     * @param rhapsodyService
     * @param logger
     */
    constructor(rhapsodyService, logger)
    {
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
}

module.exports = RhapsodyController;
