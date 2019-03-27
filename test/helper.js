'use strict';

const fs = require('fs');

function getEnvFromFile(path) {
    const envs = {};

    const fileContent = fs.readFileSync(path, { encoding: 'utf8' });
    const regex = /^export\s+(\S+)="?(\S*?)"?$/gm;

    let result;
    while (result = regex.exec(fileContent)) {
        envs[result[1]] = result[2];
    }
    return envs;
}

Object.assign(process.env, getEnvFromFile('./test/.env'));