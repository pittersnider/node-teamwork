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
            add: format(url, 'POST', 'projects.json'),
            edit: format(url, 'PUT', 'projects/%s.json'),
            delete: format(url, 'DELETE', 'projects/%s.json'),
            people: {
                list: format(url, 'GET', 'projects/%s/people.json'),
                add: format(url, 'PUT', 'projects/%s/people.json'),
                remove: format(url, 'PUT', 'projects/%s/people.json')
            },
            time: {
                add: format(url, 'POST', 'projects/%s/time_entries.json')
            }
        },
        user: {
            list: format(url, 'GET', 'people.json')
        },
        task: {
            done: format(url, 'PUT', 'tasks/%s/complete.json'),
            undone: format(url, 'PUT', 'tasks/%s/uncomplete.json'),
            add: format(url, 'POST', 'tasklists/%s/tasks.json'),
            get: format(url, 'GET', 'tasks/%s.json'),
            time: {
                add: format(url, 'POST', 'tasks/%s/time_entries.json')
            }
        },
        tasklist: {
            add: format(url, 'POST', 'projects/%s/tasklists.json'),
            get: format(url, 'GET', 'tasklists/%s.json')
        },
        time: {
            remove: format(url, 'DELETE', 'time_entries/%s.json'),
            list: format(url, 'GET', 'time_entries.json')
        },
        company: {
            add: format(url, 'POST', 'companies.json'),
            list: format(url, 'GET', 'companies.json'),
            get: format(url, 'GET', 'companies/%s.json'),
            remove: format(url, 'DELETE', 'companies/%s.json')
        }

    };

    routes.get = function(options = { name: '', args: [], params: {}, page: Page.builder() }) {

        if (!options.page || !(options.page instanceof Page)) {
            options.page = Page.builder();
        }

        const route = _.cloneDeep(_.get(routes, options.name));
        const cloneArgs = _.clone(options.args);

        route.url = route.url.replace('%s', () => cloneArgs.shift()) + options.page.querystring();
        route.data = options.params;
        route.headers = headers;

        return route;

    };

    return routes;

};

module.exports = initRouter;
