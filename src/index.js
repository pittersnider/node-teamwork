'use strict';

const Router = require('./router');
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

    async request(routeName, args, params) {

        const route = this.router.get(routeName, args, params);
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
     * Add ONE or MANY user(s) to the project.
     */
    async addProjectUser({ projectId, userIds }) {

        const args = [projectId];
        const params = { add: { userIdList: this.formatList(userIds) } };
        return await this.request({ name: 'project.people.add', args, params });

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
