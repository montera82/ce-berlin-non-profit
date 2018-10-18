'use strict';

const DEFAULT_FIRST_PAGE = 1;

let config = require('app/config/config');

class Pagination {

    /**
     * @constructor
     */
    constructor() {}

    /**
     * Get the current page
     *
     * @return {Number}
     */
    currentPage() {
        return parseInt((this.offset / this.limit) + 1);
    }

    /**
     * Checks if there is a next page record
     *
     * @return {boolean}
     */
    hasNext() {
        return (this.offset + this.limit) < this.total;
    }

    /**
     * Checks if there is a previous page record
     *
     * @return {boolean}
     */
    hasPrev() {
        return (this.offset > config.pagination.default_offset);
    }

    /**
     * Returns the next page record
     *
     * @return {*}
     */
    nextPage() {

        if (this.hasNext()) {
            return this.currentPage() + 1;
        }

        return null;
    }

    /**
     * Returns a previous page record
     *
     * @return {*}
     */
    prevPage() {

        if (this.hasPrev()) {
            return this.currentPage() - 1;
        }

        return null;
    }

    /**
     * Returns the last page
     *
     * @return {number}
     */
    lastPage() {
        return Math.ceil(this.total / this.limit);
    }

    /**
     * Returns pagination record start position
     *
     * @return {string}
     */
    getStartCount() {
        return this.offset + 1;
    }

    /**
     * Returns pagination record end position
     *
     * @return {*}
     */
    getEndCount() {
        let end = this.offset + this.limit;
        if (end > this.total) {
            end = this.total;
        }

        return end;
    }

    /**
     * Check to show pagination
     *
     * @return {boolean}
     */
    showPagination() {
        return this.limit < this.total;
    }

    /**
     * Returns paginatio related data
     *
     * @param options
     * @return {{}}
     */
    paginate(options) {
        this.limit = options.limit || config.pagination.default_limit;
        this.offset = options.offset || config.pagination.default_offset;
        this.total = options.total;

        let paginatorData = {};
        paginatorData.next = this.hasNext() ? this.nextPage(): null;
        paginatorData.prev = this.hasPrev() ? this.prevPage() : null;
        paginatorData.first = DEFAULT_FIRST_PAGE;
        paginatorData.last = this.lastPage();
        paginatorData.show = this.showPagination();
        paginatorData.start = this.getStartCount();
        paginatorData.end = this.getEndCount();
        paginatorData.total = this.total;
        

        return paginatorData;
    }

    /**
     * Get pagination filters
     * @param params
     * @return {{}}
     */
    getPagination(params) {
        let pagination = {};
        pagination.limit = parseInt(params.limit) || config.pagination.default_limit;
        pagination.offset = parseInt(params.offset) || config.pagination.default_offset;
        pagination.limit = Math.min(pagination.limit, config.pagination.max_limit);
        if (params.page) {
            pagination.offset = pagination.limit * (params.page - 1);
            delete params.page;
        }

        return pagination;
    }
}

module.exports = Pagination;
