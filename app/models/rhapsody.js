'use strict';

let Bookshelf = require('app/bookshelf');
let errors = require('app/errors');

let Rhapsody = Bookshelf.Model.extend({
    tableName: 'rhapsody',
    hasTimestamps: true,

    save: function () {
        return Bookshelf.Model.prototype.save.apply(this, arguments)
            .catch(err => {
                if (err.code === '23505') { //unique field violiation
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
