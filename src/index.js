'use strict';

const Router = require('./router');
const Page = require('./page');
const axios = require('axios');

class TeamWork {

    constructor(options = { token: null, url: null }) {

        const Authorization = 'BASIC ' + new Buffer(options.token).toString('base64');

        this.url = options.url;
        this.headers = { Authorization, 'Content-Type': 'application/json' };
        this.router = new Router(options.url, this.headers);

    }

    formatList(list) {

        const type = typeof list;

        if (type === 'array') {
            return list.join(',');
        }

        return list.toString().trim();

    }

    /**
     * Retrieves the route and performs the request
     *  using the Authentication and Content-Type headers.
     */
    async request(options = { name: null, args: [], params: {}, page: null }) {

        const route = this.router.get({
            name: options.name,
            args: options.args,
            params: options.params,
            page: options.page
        });

        let response;

        try {
            response = await axios(route);

            return {
                success: true,
                payload: response.data,
                url: route.url

            };

        } catch (error) {

            return {
                success: false,
                payload: error.response.data,
                url: route.url
            };

        }

    }

    /**
     * Add project
     */
    async addProject(input) {

        return await this.request({
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
    async listProjects(input = { includePeople: false, status: 'active' }) {

        return await this.request({
            name: 'project.list',
            args: [],
            page: Page.builder(input.pagination).set('includePeople', input.includePeople)
                .set('status', input.status)
        });

    }

    /**
     * Get details about a specific project.
     */
    async getProject(input = { projectId: '0' }) {

        return await this.request({
            name: 'project.get',
            args: [input.projectId],
            page: Page.builder(input.pagination)
        });

    }

    /**
     * Edit status
     */

    async editProject(input) {

        return await this.request({
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

    async deleteProject(input) {

        return await this.request({
            name: 'project.delete',
            args: [input.id]
        });
    }

    /**
     * Get details about a specific task.
     */
    async getTask(input = { taskId: '0' }) {

        return await this.request({
            name: 'task.get',
            args: [input.taskId],
            page: Page.builder(input.pagination)
        });

    }


    /**
     * Get details about a specific tasklist.
     */
    async getTasklist(input = { tasklistId: '0' }) {

        return await this.request({
            name: 'tasklist.get',
            args: [input.tasklistId],
            page: Page.builder(input.pagination)
        });

    }

    /**
     * Get complete and detailed people list from a specific project.
     */
    async getProjectPeople(input = { projectId: '0' }) {

        return await this.request({
            name: 'project.people.list',
            args: [input.projectId],
            page: input.pagination
        });

    }

    /**
     * Retrieve active users.
     */
    async getUsers(input = {}) {

        return await this.request({
            name: 'user.list',
            page: Page.builder(input.pagination)
        });

    }

    /**
     * Retrieve a list of active projects.
     */
    async getActiveProjects() {

        return await this.request({
            name: 'project.list',
            page: Page.builder().status('ACTIVE').all()
        });

    }

    /**
     * Retrieve pending tasks assigned to ONE or MANY user(s).
     */
    async getProjectTasks(input = { projectId: '0' }) {

        return await this.request({
            name: 'project.tasks',
            args: [input.projectId],
            page: Page.builder(input.pagination)
        });

    }

    /**
     * Add time entry to a specific user inside a specific task.
     */
    async addTaskTimeEntry(input = { taskId: '0' }) {

        return await this.request({
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
    async addProjectTimeEntry(input = { projectId: '0' }) {

        return await this.request({
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
    async addProjectUser(input = { projectId: '0', userIds: [] }) {

        return await this.request({
            name: 'project.people.add',
            args: [input.projectId],
            params: {
                add: {
                    userIdList: this.formatList(input.userIds)
                }
            }
        });

    }


    /**
     * List time by user
     */
    async listTime(input = { userId: '0', fromDate: '20180101' }) {

        return await this.request({
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
    async removeTimeEntry(input = { timeId: '0' }) {

        return await this.request({
            name: 'time.remove',
            args: [input.timeId]
        });

    }

    /**
     * Remove ONE or MANY user(s) from the project.
     */
    async removeProjectUser(input = { projectId: '0', userIds: [] }) {

        return await this.request({
            name: 'project.people.remove',
            args: [input.projectId],
            params: {
                remove: {
                    userIdList: this.formatList(input.userIds)
                }
            }
        });

    }

    /**
     * Mark ONE task as completed.
     */
    async completeTask(input = { taskId: '0' }) {

        return await this.request({
            name: 'task.done',
            args: [input.taskId]
        });

    }

    /**
     * Mark ONE task as uncompleted and reopen it.
     */
    async reopenTask(input = { taskId: '0' }) {

        return await this.request({
            name: 'task.undone',
            args: [input.taskId]
        });

    }

    /**
     * Create a task inside of a specific tasklist.
     */
    async addTask(input = { tasklistId: '0' }) {

        return await this.request({
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
    async addTasklist(input = { projectId: '0' }) {

        return await this.request({
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
    async addCompany(input) {

        return await this.request({
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
    async getCompanies() {

        return await this.request({
            name: 'company.list',
            args: [],
            page: Page.builder(),
        });

    }

    /**
     * Get specific company
     */
    async getCompany(companyId) {

        return await this.request({
            name: 'company.get',
            args: [companyId],
            page: Page.builder(),
        });

    }

    /**
     * Remove specific company
     */
    async removeCompany(companyId) {

        return await this.request({
            name: 'company.delete',
            args: [companyId],
            page: Page.builder(),
        });

    }
}

TeamWork.page = require('./page');
TeamWork.helper = require('./helper');
TeamWork.router = require('./router');

module.exports = TeamWork;
