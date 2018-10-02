'use strict';

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
     *
     * @param name
     * @param prepTime
     * @param difficulty
     * @param vegetarian
     * @returns {Promise.<TResult>}
     */
    list() {
        //todo definition of method that will list all 
    }
}

module.exports = RhapsodyService;
