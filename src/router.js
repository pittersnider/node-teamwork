'use strict';

const _ = require('lodash');
const Page = require('./page');

const format = function(url, type = 'GET', name) {

    return {
        url: url + '/' + name,
        method: type
    };

};

const initRouter = function(url, headers) {

    Object.freeze(headers);

    const routes = {

        project: {
            list: format(url, 'GET', 'projects.json'),
            get: format(url, 'GET', 'projects/%s.json'),
            tasks: format(url, 'GET', 'projects/%s/tasks.json'),
            people: {
                add: format(url, 'PUT', 'projects/%s/people.json'),
                remove: format(url, 'PUT', 'projects/%s/people.json')
            },
            time: {
                add: format(url, 'POST', 'projects/%s/time_entries.json')
            }
        },
        user: {
            list: format(url, 'GET', 'people.json'),
            tasks: format(url, 'GET', 'tasks.json')
        },
        task: {
            done: format(url, 'PUT', 'tasks/%s/complete.json'),
            undone: format(url, 'PUT', 'tasks/%s/uncomplete.json'),
            add: format(url, 'POST', 'tasklists/%s/tasks.json')
        },
        tasklist: {
            add: format(url, 'POST', 'projects/%s/tasklists.json')
        }

    };

    routes.get = function({ name, args = [], params = {}, page = Page.builder() }) {

        const route = _.get(routes, name);
        const cloneArgs = _.clone(args);

        route.url = route.url.replace('%s', () => cloneArgs.shift()) + page.querystring();
        route.data = params;
        route.headers = headers;

        return route;

    };

    return routes;

};

module.exports = initRouter;
