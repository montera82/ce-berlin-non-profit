'use strict';

var _ = require('underscore');

function Paginator (page, perPage) {
    this.currentPage = (!_.isNumber(page) ? Number(page) : page) || 1;
    this.perPage = (!_.isNumber(perPage) ? Number(perPage) : perPage) || 4;
    this.lastPage = 0;
    this.data = [];

    return this;
}

Paginator.prototype.setCount = function (count) {
    this.count = Number(count);

    return this;
};

Paginator.prototype.getLastPage = function () {
    this.lastPage = Math.ceil((this.count / this.perPage - 1) + 1);

    return this.lastPage;
};

Paginator.prototype.setData = function (data) {
    this.data = data;

    return this;
};

Paginator.prototype.getPaginator = function () {
    this.getLastPage();

    if(!this.pages) {
        this.getPages();
    }

    return this;
};

Paginator.prototype.getCurrentPage = function () {
    return this.currentPage;
};

Paginator.prototype.getLimit = function () {
    return this.perPage;
};

Paginator.prototype.getPages = function () {
    this.pages = [];

    var i;

    for(i=1; i<this.lastPage + 1; i++) {
        this.pages.push(i);
    }

    return this.pages;
};

Paginator.prototype.getOffset = function () {
    return (this.currentPage - 1) * this.perPage;
};

module.exports = Paginator;