'use strict';

const TeamWork = require('../src');

describe('TeamWork', function() {
    const tw = new TeamWork({
        token: process.env.TEAMWORK_TOKEN,
        url: process.env.TEAMWORK_URL
    });

    it('should work', async function() {
        const projects = (await tw.getActiveProjects()).projects;
        // console.log(projects.length);
    });
});