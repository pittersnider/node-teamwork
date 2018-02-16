'use strict';

const _ = require('lodash');

const format = function(url, type = 'GET', name) {

    return {
        url: url + '/' + name,
        method: type
    };

};

const initRouter = function (url, headers) {
    
    Object.freeze(headers);

    const routes = {

        project: {
            list: format(url, 'GET', 'projects.json'),
            get: format(url, 'GET', 'projects/%s.json'),
            people: {
                add: format(url, 'PUT', 'projects/%s/people.json'),
                remove: format(url, 'PUT', 'projects/%s/people.json')
            }
        },
        user: {
            list: format(url, 'GET', 'people.json')
        },
        task: {},
        tasklist: {}

    };

    routes.get = function({ name, args = [], params = {} }) {

        const route = _.get(routes, name);
        const cloneArgs = _.clone(args);

        route.url = route.url.replace('%s', () => cloneArgs.shift());
        route.data = params;
        route.headers = headers;

        return route;

    };

    return routes;

};

module.exports = initRouter;
