'use strict';

const _ = require('lodash');
const {
    assert
} = require('chai');
const TeamWork = require('../src');

describe('Router', function() {
    it('should parse params correctly', async function() {
        const params = {
            add: {
                userIdList: [1, 2, 3, 4],
                projects: {
                    ids: [1, 2, 3]
                }
            }
        };

        const router = new TeamWork.Router('url', {});
        const parsedParams = router.parseParams(params);

        const foundString = parsedParams.add.projects.ids;
        const expectedString = params.add.projects.ids.join(',');

        assert.strictEqual(foundString, expectedString);
    });
});