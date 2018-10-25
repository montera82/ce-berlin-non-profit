'use strict';

let Bookshelf = require('app/bookshelf');
let errors = require('app/errors');
const ERR_CODE_UNIQUE_VIOLATION_POSTGRES = '23505';

let Rhapsody = Bookshelf.Model.extend({
    tableName: 'rhapsody',
    hasTimestamps: true,

    save: function () {
        return Bookshelf.Model.prototype.save.apply(this, arguments)
            .catch(err => {
                if (err.code === ERR_CODE_UNIQUE_VIOLATION_POSTGRES) { //unique field violiation
                    throw new errors.DuplicateDate('Date already exist');
                }
                throw err;
            })
    },

    fetch: function () {
        return Bookshelf.Model.prototype.fetch.apply(this, arguments)
            .catch(err => {
                if (err instanceof Rhapsody.NotFoundError) {
                    throw new errors.RhapsodyNotFound('Rhapsody not found');
                }
                throw err;
            })
    }

});

module.exports = Bookshelf.model('rhapsody', Rhapsody);
