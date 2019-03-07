'use strict';

const _ = require('lodash');
const Page = require('./Page');

class Router {
    constructor(url, headers) {
        Object.freeze(headers);

        function format(method, name) {
            return {
                url: `${url}/${name}`,
                method
            };
        }

        this.headers = headers;
        this.routes = {
            project: {
                list: format('GET', 'projects.json'),
                get: format('GET', 'projects/%s.json'),
                tasks: format('GET', 'projects/%s/tasks.json'),
                add: format('POST', 'projects.json'),
                edit: format('PUT', 'projects/%s.json'),
                delete: format('DELETE', 'projects/%s.json'),
                people: {
                    list: format('GET', 'projects/%s/people.json'),
                    add: format('PUT', 'projects/%s/people.json'),
                    remove: format('PUT', 'projects/%s/people.json')
                },
                time: {
                    add: format('POST', 'projects/%s/time_entries.json')
                }
            },
            user: {
                list: format('GET', 'people.json')
            },
            task: {
                done: format('PUT', 'tasks/%s/complete.json'),
                undone: format('PUT', 'tasks/%s/uncomplete.json'),
                add: format('POST', 'tasklists/%s/tasks.json'),
                get: format('GET', 'tasks/%s.json'),
                time: {
                    add: format('POST', 'tasks/%s/time_entries.json')
                }
            },
            tasklist: {
                add: format('POST', 'projects/%s/tasklists.json'),
                get: format('GET', 'tasklists/%s.json')
            },
            time: {
                remove: format('DELETE', 'time_entries/%s.json'),
                list: format('GET', 'time_entries.json')
            },
            company: {
                add: format('POST', 'companies.json'),
                list: format('GET', 'companies.json'),
                get: format('GET', 'companies/%s.json'),
                remove: format('DELETE', 'companies/%s.json')
            }
        };
    }

    get(options = { name: '', args: [], params: {}, page: Page.builder() }) {
        if (!options.page || !(options.page instanceof Page)) {
            options.page = Page.builder();
        }

        const route = _.cloneDeep(_.get(this.routes, options.name));
        const cloneArgs = _.clone(options.args);

        route.url = route.url.replace('%s', () => cloneArgs.shift()) + options.page.querystring();
        route.data = options.params;
        route.headers = this.headers;

        return route;
    }
}

module.exports = Router;