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
        let error = this.rhapsodyService.validateRhapsodyData(req);
        if (error) {
            this.logger.error('Validation Error: ', error);
            let errorMessages = error.map(item => item.msg);
            req.flash('error', errorMessages);
            return res.render('admin_add_rhapsody', { layout: 'admin_main' });
        }

        this.rhapsodyService.createRhapsody(body)
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
    list(req, res, next) {
        let viewData = {
            menuActive: 'rhapsody'
        };
        let params = {};
        if (req.query.page) {
            params.page = req.query.page;
        }

        this.rhapsodyService.listRhapsodies(params)
            .then(data => {
                viewData.rhapsodies = data.rhapsodies;
                viewData.pagination = data.pagination;
                res.render('admin_list_rhapsody', { viewData, layout: 'admin_main' });
            })
            .catch(() => {
                req.flash('error', 'There was an error retrieving rhapsodies, Please try again');
                res.render('admin_add_rhapsody', { viewData, layout: 'admin_main' });
            });
    }

    /**
    * rhapsody list
    *
    * @param req
    * @param res
    */
    editView(req, res, next) {
        let viewData = {
            menuActive: 'rhapsody'
        };
        let rhapsodyId = req.params.id;
        let error = req.query.e;
        if(error){
            viewData.error = decodeURIComponent(error);
        }

        if (!rhapsodyId) {
            req.flash('error', 'No Rhapsody ID specified');
            res.redirect('/admin/list-rhapsody-realities');
        }
        this.rhapsodyService.getRhapsody(rhapsodyId)
            .then(rhapsody => {
                viewData.rhapsody = rhapsody;
                res.render('admin_edit_rhapsody', { viewData, layout: 'admin_main' });
            })
            .catch(() => {
                req.flash('error', 'An unknown error has occurred, Please try again later');
                res.redirect('/admin/list-rhapsody-realities');
            });
    }

    /**
     * rhapsody list
     *
     * @param req
     * @param res
     */
    update(req, res, next) {
        let viewData = {
            menuActive: 'rhapsody'
        };
        let body = req.body;
        // Validate Form Input
        let error = this.rhapsodyService.validateRhapsodyData(req);
        if (error) {
            this.logger.error('Validation Error: ', error);
            let errorMessages = error.map(item => item.msg);
            let url = '/admin/edit-rhapsody-realities/' + body.id + '?e=' + encodeURIComponent(error[0].msg);
            req.flash('error', errorMessages);
            return res.redirect(url);
        }

        this.rhapsodyService.update(body)
            .then( rhapsody => {
                req.flash('success', 'Updated successfully!');
                res.redirect('/admin/list-rhapsody-realities');
            })
            .catch( err => {
                req.flash('error', 'An unknown error has occurred, Please try again later');
                res.redirect('/admin/list-rhapsody-realities');
            })
    }
}

module.exports = RhapsodyController;
