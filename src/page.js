'use strict';

const _ = require('lodash');

class Page {

    constructor(basics = { limit: 250, offset: 0 }) {
        this.queries = {
            pageSize: [basics.limit],
            page: [Math.round(basics.offset / basics.limit) + 1]
        };
    }

    index(number) {

        this.queries.page = [number];
        return this;

    }

    max(number) {
        return this.size(number);
    }

    size(number) {

        this.queries.pageSize = [number];
        return this;

    }

    status() {
        return this.defineTerm('status', Object.values(arguments));
    }

    defineTerm(name, values) {

        if (!Array.isArray(values)) {
            values = [values.toString()];
        } else {
            values = values.map((value) => String(value));
        }

        if (this.queries[name]) {
            this.queries[name].push(...values);
        } else {
            this.queries[name] = [...values];
        }

        return this;

    }

    all() {
        delete this.queries.pageSize;
        return this;
    }

    fromUser() {
        return this.defineTerm('responsible-party-ids', Object.values(arguments));
    }

    includePeople() {
        return this.defineTerm('includePeople', Object.values(arguments));
    }

    /**
     * Compile queries and turns into a url querystring.
     */
    querystring() {
        return '?' + Object.keys(this.queries).map((key) => key + '=' + this.queries[key].join(',')).join('&');
    }

    static builder(defaultPage) {

        if (defaultPage && (defaultPage instanceof Page)) {
            return _.cloneDeep(defaultPage);
        }

        return new Page();

    }

}

module.exports = Page;
