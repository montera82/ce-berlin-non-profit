'use strict';

let Rhapsody = require('app/models/rhapsody');
let Bookshelf = require('app/bookshelf');
    
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
}

module.exports = RhapsodyService;
