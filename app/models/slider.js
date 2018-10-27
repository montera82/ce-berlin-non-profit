'use strict';

let Bookshelf = require('app/bookshelf');

let Slider = Bookshelf.Model.extend({
    tableName: 'slider',
    hasTimeStamps: true,
});

module.exports = Bookshelf.model('slider', Slider);