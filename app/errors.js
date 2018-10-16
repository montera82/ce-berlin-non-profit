'use strict';

let create = require('custom-error-generator');

module.exports = {
    UnknownError: create('UnknownError', { code: 'UNKNOWN_ERROR' })
};
