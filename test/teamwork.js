'use strict';

const _ = require('lodash');
const {
    assert
} = require('chai');
const TeamWork = require('../src');

describe('TeamWork', function() {
    const tw = new TeamWork({
        token: process.env.TEAMWORK_TOKEN,
        url: process.env.TEAMWORK_URL
    });

    it('should work', async function() {
        this.timeout(10 * 1000);

        let projects = [];
        let result = await tw.getActiveProjects();
        do {
            for (const project of result.projects) {
                projects.push(project.id);
            }
        } while (result = await result.next());

        result = await tw.getProject({
            projectId: projects.pop()
        });

        assert.isUndefined(await result.next());
    });
});