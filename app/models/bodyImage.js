'use strict';

let Bookshelf = require('app/bookshelf');

let BodyImage = Bookshelf.Model.extend({
    tableName: 'body_image',
    hasTimeStamps: true,
});

module.exports = Bookshelf.model('bodyImage', BodyImage);
