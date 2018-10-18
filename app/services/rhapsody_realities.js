'use strict';

let Rhapsody = require('app/models/rhapsody');
let Bookshelf = require('app/bookshelf');
let paginator = require('app/lib/paginator');
paginator = new paginator();
    
class RhapsodyService {

    /**
     * Rhapsody
     * service constructor
     *
     * @constructor
     * @param {logger} logger instance of the logger
     */
    constructor(logger) {
        this.logger = logger;
    }

    /**
     * Create rhapsody
     * 
     * @param {*} data 
     */
    createRhapsody(data) {
        let rhapsody = {};
        rhapsody.title = data.title;
        rhapsody.opening_verse = data.opening_verse;
        rhapsody.body = data.body;
        rhapsody.confession = data.confession;
        rhapsody.further_scripture = data.further_scripture;
        rhapsody.one_year_bible_plan = data.one_year_bible_plan;
        rhapsody.date = data.date;
        rhapsody.lang = data.lang;

        return Bookshelf.transaction(trx => {
            return new Rhapsody().save(rhapsody, { method: 'insert', transacting: trx })
                .then(rhapsody => {
                    this.logger.info('successfully created new rhapsody');
                    return rhapsody;
                })
                .catch(err => {
                    this.logger.error('failed to create rhapsody', err);
                    throw new errors.UnknownError('an error occurred');
                });
        });
    }

    validateRhapsodyData(req){
        req.checkBody('title', 'Title field is required').notEmpty();
        req.checkBody('opening_verse', 'Opening verse field is required').notEmpty();
        req.checkBody('body', 'Body field is required').notEmpty();
        req.checkBody('confession', 'Confession field is required').notEmpty();
        req.checkBody('further_scripture', 'Further Scripture field is required').notEmpty();
        req.checkBody('one_year_bible_plan', 'One year bible plan field is required').notEmpty();
        req.checkBody('date', 'Date field is required').notEmpty();
        req.checkBody('lang', 'Language field is required').notEmpty();

        return req.validationErrors();
    }

    /**
     * Lists all rhapsodies
     */
    listRhapsodies (params) {
        let pagination = {};
        let pages = paginator.getPagination(params);

        return new Rhapsody()
            .query()   
            .count()
            .then( count => {
                pages.total = count[0].count;
                return new Rhapsody().query(qb => {
                    qb.limit(pages.limit).offset(pages.offset);
                }).fetchAll();
            })
            .then(rhapsodies => {
                this.logger.info('successfully fetched Rhasodies');
                pagination = paginator.paginate({
                    limit: pages.limit,
                    offset: pages.offset,
                    total: pages.total
                });
                return {
                    rhapsodies: rhapsodies.toJSON(),
                    pagination: pagination
                };
            })
            .catch(err => {
                this.logger.error('failed to fetch Rhasodies ', err.message);
                throw new errors.UnknownError('an unknown error occurred');
            });
    };
}

module.exports = RhapsodyService;
