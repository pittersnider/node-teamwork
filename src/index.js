'use strict';

const TeamWork = require('./TeamWork');
TeamWork.Page = require('./Page');
TeamWork.Router = require('./Router');
TeamWork.Helper = require('./Helper');

// backwards compatibility
TeamWork.page = TeamWork.Page;
TeamWork.router = TeamWork.Router;
TeamWork.helper = TeamWork.Helper;

module.exports = TeamWork;