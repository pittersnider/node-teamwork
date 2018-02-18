'use strict';

const Router = require('./router');
const Helper = require('./helper');
const Page = require('./page');
const axios = require('axios');

class TeamWork {

    constructor({ token, url }) {

        const Authorization = 'BASIC ' + new Buffer(token).toString('base64');

        this.url = url;
        this.headers = { Authorization, 'Content-Type': 'application/json' };
        this.router = new Router(url, this.headers);

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
    async request({ name, args, params, page }) {

        const route = this.router.get({ name, args, params, page });
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
     * Get details about a specific project.
     */
    async getProject({ projectId, includePeople = true }) {

        const args = [projectId];
        const page = Page.builder().includePeople(includePeople);
        return await this.request({ name: 'project.get', page, args });

    }

    /**
     * Get complete and detailed people list from a specific project.
     */
    async getProjectPeople({ projectId }) {

        const args = [projectId];
        return await this.request({ name: 'project.people.list', args });

    }

    /**
     * Retrieve pending tasks assigned to ONE or MANY user(s).
     */
    async getUserTasks({ userIds }) {

        const page = Page.builder().fromUser(userIds);
        return await this.request({ name: 'user.tasks', page });

    }

    /**
     * Retrieve pending tasks assigned to ONE or MANY user(s).
     */
    async getProjectTasks({ projectId, userIds = [] }) {

        const args = [projectId];
        const page = Page.builder().fromUser(userIds);
        return await this.request({ name: 'project.tasks', args, page });

    }

    /**
     * Add time entry to a specific user inside a specific task.
     */
    async addTaskTimeEntry({
        taskId,
        userId,
        hours,
        minutes,
        description,
        date = Helper.date(),
        time = Helper.time(),
        isbillable = '1',
        tags = ''
    }) {

        const args = [taskId];
        const params = {
            'time-entry': {
                'hours': hours,
                'minutes': minutes,
                'isbillable': isbillable,
                'tags': tags,
                'time': time,
                'date': date,
                'description': description,
                'person-id': userId
            }
        };

        return await this.request({ name: 'task.time.add', args, params });

    }

    /**
     * Add time entry to a specific user inside a specific project.
     */
    async addProjectTimeEntry({
        projectId,
        userId,
        hours,
        minutes,
        description,
        date = Helper.date(),
        time = Helper.time(),
        isbillable = '1',
        tags = ''
    }) {

        const args = [projectId];
        const params = {
            'time-entry': {
                'hours': hours,
                'minutes': minutes,
                'isbillable': isbillable,
                'tags': tags,
                'time': time,
                'date': date,
                'description': description,
                'person-id': userId
            }
        };

        return await this.request({ name: 'project.time.add', args, params });

    }

    /**
     * Add ONE or MANY user(s) to the project.
     */
    async addProjectUser({ projectId, userIds }) {

        const args = [projectId];
        const params = { add: { userIdList: this.formatList(userIds) } };
        return await this.request({ name: 'project.people.add', args, params });

    }

    /**
     * Add ONE or MANY user(s) to the project.
     */
    async removeTimeEntry({ timeId }) {

        const args = [timeId];
        return await this.request({ name: 'time.remove', args });

    }

    /**
     * Remove ONE or MANY user(s) from the project.
     */
    async removeProjectUser({ projectId, userIds }) {

        const args = [projectId];
        const params = { remove: { userIdList: this.formatList(userIds) } };
        return await this.request({ name: 'project.people.remove', args, params });

    }

    /**
     * Mark ONE task as completed.
     */
    async completeTask({ taskId }) {

        const args = [taskId];
        return await this.request({ name: 'task.done', args });

    }

    /**
     * Mark ONE task as uncompleted and reopen it.
     */
    async reopenTask({ taskId }) {

        const args = [taskId];
        return await this.request({ name: 'task.undone', args });

    }

    /**
     * Create a task inside of a specific tasklist.
     */
    async addTask({
        parentTaskId = '0',
        tasklistId,
        content,
        progress = '0',
        startDate = '',
        endDate = ''
    }) {

        const args = [tasklistId];
        const params = {
            'todo-item': {
                'content': content,
                'progress': progress,
                'parentTaskId': parentTaskId,
                'start-date': startDate,
                'end-date': endDate
            }
        };

        return await this.request({ name: 'task.add', args, params });

    }

    /**
     * Create a tasklist inside of a specific project.
     */
    async addTasklist({
        projectId,
        name,
        description,
        hidden = false,
        pinned = false,
        milestoneId = '',
        todoListTemplateId = ''
    }) {

        const args = [projectId];
        const params = {
            'todo-list': {
                'name': name,
                'pinned': pinned,
                'description': description,
                'todo-list-template-id': todoListTemplateId,
                'milestone-id': milestoneId,
                'private': hidden
            }
        };

        return await this.request({ name: 'tasklist.add', args, params });

    }

}

module.exports = TeamWork;
