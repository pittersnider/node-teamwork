'use strict';

const _ = require('lodash');
const axios = require('axios');

const TeamWorkResponse = require('./TeamWorkResponse');
const Router = require('./Router');
const Page = require('./Page');

class TeamWork {
    constructor(options = { token: null, url: null }) {
        this.url = options.url;
        this.headers = {
            'Authorization': `BASIC ${Buffer.from(options.token).toString('base64')}`,
            'Content-Type': 'application/json'
        };
        this.router = new Router(options.url, this.headers);
    }

    /**
     * Retrieves the route and performs the request
     *  using the Authentication and Content-Type headers.
     * 
     * @return {TeamWorkResponse}
     */
    async request(options) {
        options = _.assign({
            name: null,
            args: [],
            params: {},
            page: null
        }, options);

        if (!(options.page instanceof Page)) {
            options.page = Page.builder();
        }

        const route = this.router.get(options);
        try {
            const response = await axios(route);
            return new TeamWorkResponse({
                tw: this,
                response,
                options
            });
        } catch (e) {
            let message = e.response.data;
            if (message.CONTENT) {
                message = message.CONTENT;
            }

            if (message.MESSAGE) {
                message = message.MESSAGE;
            } else if (e.code === 404) {
                message = 'content not found';
            } else {
                message = 'an error has occurred';
            }

            const error = new Error(message);
            error.url = route.url;
            error.source = e;
            throw error;
        }
    }

    /**
     * Add project
     */
    addProject(input) {
        return this.request({
            name: 'project.add',
            args: [],
            page: Page.builder(),
            params: {
                project: input
            }
        });
    }

    /**
     * List all project.
     */
    listProjects(input = { includePeople: false, status: 'active' }) {
        return this.request({
            name: 'project.list',
            args: [],
            page: Page.builder(input.pagination).set('includePeople', input.includePeople)
                .set('status', input.status)
        });
    }

    /**
     * Get details about a specific project.
     */
    getProject(input = { projectId: '0' }) {
        return this.request({
            name: 'project.get',
            args: [input.projectId],
            page: Page.builder(input.pagination)
        });
    }

    /**
     * Edit status
     */

    editProject(input) {
        return this.request({
            name: 'project.edit',
            args: [input.id],
            params: {
                project: {
                    status: input.status
                }
            }
        });
    }

    /**
     * Delete status
     */

    deleteProject(input) {
        return this.request({
            name: 'project.delete',
            args: [input.id]
        });
    }

    /**
     * Get details about a specific task.
     */
    getTask(input = { taskId: '0' }) {
        return this.request({
            name: 'task.get',
            args: [input.taskId],
            page: Page.builder(input.pagination)
        });
    }

    /**
     * Get details about a specific tasklist.
     */
    getTasklist(input = { tasklistId: '0' }) {
        return this.request({
            name: 'tasklist.get',
            args: [input.tasklistId],
            page: Page.builder(input.pagination)
        });
    }

    /**
     * Get complete and detailed people list from a specific project.
     */
    getProjectPeople(input = { projectId: '0' }) {
        return this.request({
            name: 'project.people.list',
            args: [input.projectId],
            page: input.pagination
        });
    }

    /**
     * Retrieve active users.
     */
    getUsers(input = {}) {
        return this.request({
            name: 'user.list',
            page: Page.builder(input.pagination)
        });
    }

    /**
     * Retrieve a list of active projects.
     */
    getActiveProjects() {
        return this.request({
            name: 'project.list',
            page: Page.builder().status('ACTIVE')
        });
    }

    /**
     * Retrieve pending tasks assigned to ONE or MANY user(s).
     */
    getProjectTasks(input = { projectId: '0' }) {
        return this.request({
            name: 'project.tasks',
            args: [input.projectId],
            page: Page.builder(input.pagination)
        });
    }

    /**
     * Add time entry to a specific user inside a specific task.
     */
    addTaskTimeEntry(input = { taskId: '0' }) {
        return this.request({
            name: 'task.time.add',
            args: [input.taskId],
            params: {
                'time-entry': input['time-entry']
            }
        });
    }

    /**
     * Add time entry to a specific user inside a specific project.
     */
    addProjectTimeEntry(input = { projectId: '0' }) {
        return this.request({
            name: 'project.time.add',
            args: [input.projectId],
            params: {
                'time-entry': input['time-entry']
            }
        });
    }

    /**
     * Add ONE or MANY user(s) to the project.
     */
    addProjectUser(input = { projectId: '0', userIds: [] }) {
        return this.request({
            name: 'project.people.add',
            args: [input.projectId],
            params: {
                add: {
                    userIdList: input.userIds
                }
            }
        });
    }

    /**
     * List time by user
     */
    listTime(input = { userId: '0', fromDate: '20180101' }) {
        return this.request({
            name: 'time.list',
            args: [],
            params: {
                userId: input.userId,
                fromdate: input.fromDate,
                todate: input.toDate
            }
        });
    }

    /**
     * Add ONE or MANY user(s) to the project.
     */
    removeTimeEntry(input = { timeId: '0' }) {
        return this.request({
            name: 'time.remove',
            args: [input.timeId]
        });
    }

    /**
     * Remove ONE or MANY user(s) from the project.
     */
    removeProjectUser(input = { projectId: '0', userIds: [] }) {
        return this.request({
            name: 'project.people.remove',
            args: [input.projectId],
            params: {
                remove: {
                    userIdList: input.userIds
                }
            }
        });
    }

    /**
     * Mark ONE task as completed.
     */
    completeTask(input = { taskId: '0' }) {
        return this.request({
            name: 'task.done',
            args: [input.taskId]
        });
    }

    /**
     * Mark ONE task as uncompleted and reopen it.
     */
    reopenTask(input = { taskId: '0' }) {
        return this.request({
            name: 'task.undone',
            args: [input.taskId]
        });
    }

    /**
     * Create a task inside of a specific tasklist.
     */
    addTask(input = { tasklistId: '0' }) {
        return this.request({
            name: 'task.add',
            args: [input.tasklistId],
            params: {
                'todo-item': input['todo-item']
            }
        });
    }

    /**
     * Create a tasklist inside of a specific project.
     */
    addTasklist(input = { projectId: '0' }) {
        return this.request({
            name: 'tasklist.add',
            args: [input.projectId],
            params: {
                'todo-item': input['todo-item']
            }
        });
    }

    /**
     * Add company
     */
    addCompany(input) {
        return this.request({
            name: 'company.add',
            args: [],
            page: Page.builder(),
            params: {
                company: input
            }
        });
    }

    /**
     * List all companies
     */
    getCompanies() {
        return this.request({
            name: 'company.list',
            args: [],
            page: Page.builder(),
        });
    }

    /**
     * Get specific company
     */
    getCompany(companyId) {
        return this.request({
            name: 'company.get',
            args: [companyId],
            page: Page.builder(),
        });
    }

    /**
     * Remove specific company
     */
    removeCompany(companyId) {
        return this.request({
            name: 'company.delete',
            args: [companyId],
            page: Page.builder(),
        });
    }
}

module.exports = TeamWork;