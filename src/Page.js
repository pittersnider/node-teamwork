'use strict';

const _ = require('lodash');

class Page {
    constructor(options) {
        options = _.assign({
            page: 1,
            pageSize: 500
        }, options);

        this.queries = {
            page: options.page,
            pageSize: options.pageSize
        };
    }

    /**
     * The page number, used with 'max' items per time.
     * @see #max
     */
    page(number) {
        this.queries.page = number;
        return this;
    }

    /**
     * Item limit per page.
     */
    limit(number) {
        this.queries.pageSize = number;
        return this;
    }

    /**
     * 
     * @param {*} result 
     * @return {boolean}
     */
    next(result) {
        const totalPages = +result.headers['x-pages'];
        if (_.isFinite(totalPages) && this.queries.page + 1 <= totalPages) {
            ++this.queries.page;
            return true;
        }

        return false;
    }

    /**
     * Filter by statuses.
     */
    status(...args) {
        return this.set('status', Object.values(args));
    }

    /**
     * Internal API to set query values [not compiled].
     */
    set(name, values) {
        if (!Array.isArray(values)) {
            values = [values.toString()];
        } else {
            values = values.map(value => String(value));
        }

        if (this.queries[name]) {
            this.queries[name].push(...values);
        } else {
            this.queries[name] = [...values];
        }

        return this;
    }

    /**
     * Compile queries and turns into a url querystring.
     */
    querystring() {
        const queryParams = _.toPairs(this.queries).map(([key, value]) => {
            if (_.isArray(value)) {
                value = value.join(',');
            }

            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        });

        if (queryParams.length > 0) {
            return `?${queryParams.join('&')}`;
        }
        return '';
    }

    static builder(defaultPage) {
        if (defaultPage && (defaultPage instanceof Page)) {
            return _.cloneDeep(defaultPage);
        }

        return new Page();
    }
}

module.exports = Page;
