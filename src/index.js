'use strict';

const _TeamWork = require('./TeamWork');
const Page = require('./Page');
const Router = require('./Router');
const Helper = require('./Helper');

class TeamWork extends _TeamWork {
    static get Page() { return Page; }
    static get Router() { return Router; }
    static get Helper() { return Helper; }

    // backwards compatibility
    static get page() { return Page; }
    static get router() { return Router; }
    static get helper() { return Helper; }
}

module.exports = TeamWork;