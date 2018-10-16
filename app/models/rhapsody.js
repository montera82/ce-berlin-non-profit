'use strict';

let Bookshelf = require('app/bookshelf');

let Rhapsody = Bookshelf.Model.extend({
    tableName : 'rhapsody',
    hasTimestamps : true

});

module.exports  = Bookshelf.model('rhapsody', Rhapsody);