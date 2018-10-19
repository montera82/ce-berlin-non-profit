'use strict';

let Bookshelf = require('app/bookshelf');

let Rhapsody = Bookshelf.Model.extend({
    tableName: 'rhapsody',
    hasTimestamps: true,

    fetch: function () {
        return Bookshelf.Model.prototype.fetch.apply(this, arguments)
            .catch(err => {
                if (err instanceof Rhapsody.NotFoundError) {
                    throw new err.RhapsodyNotFound('Rhapsody not found');
                }
                throw err;
            })
    }

});

module.exports = Bookshelf.model('rhapsody', Rhapsody);