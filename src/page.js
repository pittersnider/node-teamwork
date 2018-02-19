'use strict';

const _ = require('lodash');

class Page {

    constructor(basics = { limit: 250, offset: 0 }) {
        this.queries = {
            pageSize: [basics.limit],
            page: [Math.round(basics.offset / basics.limit) + 1]
        };
    }

    /**
     * The page number, used with 'max' items per time.
     * @see #max
     */
    page(number) {

        this.queries.page = [number];
        return this;

    }

    /**
     * Item limit per page.
     */
    limit(number) {

        this.queries.pageSize = [number];
        return this;

    }

    /**
     * Filter by statuses.
     */
    status() {
        return this.defineTerm('status', Object.values(arguments));
    }

    /**
     * Internal API to set query values [not compiled].
     */
    set(name, values) {

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

    /**
     * Retrieve all rows or, by default, requests the default estimated
     *   value from TeamWork.
     */
    all() {
        delete this.queries.pageSize;
        return this;
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
