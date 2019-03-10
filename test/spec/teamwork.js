'use strict';

const _ = require('lodash');
const {
    assert
} = require('chai');
const TeamWork = require('../../src');

describe('TeamWork', function() {
    const tw = new TeamWork({
        url: process.env.TEAMWORK_URL,
        token: process.env.TEAMWORK_TOKEN
    });

    const projects = [];

    it('should paginate', async function() {
        this.timeout(10 * 1000);

        let i = 0;
        let result = await tw.getActiveProjects();
        do {
            for (const project of result.projects) {
                projects.push(project.id);
            }
        } while (++i < 2 && (result = await result.next()));
        // only loop 2 pages
    });

    it('should paginate correctly on .all()', async function() {
        let count = 0;
        for await (const { projects } of (await tw.getActiveProjects()).all()) {
            count += projects.length;
        }
        assert.notEqual(count, 0);
    });

    it('should get a project and not paginate', async function() {
        if (projects.length === 0) {
            throw new Error('need more projects');
        }

        const result = await tw.getProject({
            projectId: projects.pop()
        });
        assert.isUndefined(await result.next());
    });

    it('should throw bad request', async function() {
        try {
            await tw.getProject({
                projectId: '12/34'
            });
        } catch (e) {
            assert.equal(e.message, 'Bad request');
        }
    });
});