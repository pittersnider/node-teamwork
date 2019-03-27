'use strict';

const _ = require('lodash');

class TeamWorkResponse {
    constructor({ tw, response, options }) {
        this._tw = tw;
        this._response = response;
        this._options = options;

        Object.assign(this, this.payload);
    }

    /**
     * @return {TeamWorkResponse[]}
     */
    async *until({ page }) {
        let result = this;
        do {
            yield result;
        } while ((!_.isFinite(page) || --page > 0) && (result = await result.next));
    }

    get all() {
        return this.until({ page: Infinity });
    }

    /**
     * @returns {TeamWorkResponse}
     */
    get next() {
        return new Promise(resolve => {
            if (this._options.page.next(this._response)) {
                setImmediate(() => {
                    resolve(this._tw.request(this._options));
                });
            } else {
                resolve();
            }
        });
    }

    get payload() {
        return this._response.data;
    }
}

module.exports = TeamWorkResponse;