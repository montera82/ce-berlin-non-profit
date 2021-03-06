'use strict';

let create = require('custom-error-generator');

module.exports = {
    UnknownError: create('UnknownError', { code: 'UNKNOWN_ERROR' }),
    RhapsodyNotFound: create('RhapsodyeNotFound', { code: 'RHAPSODY_NOT_FOUND' }),
    DuplicateDate: create('DuplicateDateField', { code: 'DUPLICATE_DATE_FIELD'}),
    NoSliderSelected: create('NoSliderSeleted', {code: 'NO_SLIDER_WAS_SELECTED_FOR_UPLOAD'}),
};
