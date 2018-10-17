'use strict';

let Rhapsody = require('app/models/rhapsody');
let Bookshelf = require('app/bookshelf');
let Paginator = require('app/lib/paginator');
    
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
     * Lists all rhapsodies
     */
    list() {
        //todo definition of method that will list all 
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
        // Form Data Validation
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

    listRhapsodies (req, res) {
        var query = req.query;
    
        var page, per_page, skip = null, limit = null, paginator = null;
    
        page = Number(query.page || 2);
        per_page = Number(query.per_page || 2);
    
        paginator = new Paginator(page, per_page);
    
        limit = paginator.getLimit();
        skip = paginator.getOffset();
    
        return new Rhapsody()
            .query(function (qb) {
                qb.limit(limit).offset(skip);
            })
            .fetchAll()
            .then(rhapsodies => {
                return new Rhapsody()
                .query()
                .count()
                .then(count => {
                    count = count[0]['count(*)'];
    
                    return {
                        count: count,
                        rows: rhapsodies
                    };
                });
            }, err => {
                throw err;
            }).then(result => {

                var count = result.count;
                var items = result.rows;
    
                paginator.setCount(count);
                paginator.setData(items);
    
                return paginator.getPaginator();
            });
    };
}

module.exports = RhapsodyService;
