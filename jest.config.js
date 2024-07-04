const path = require('path');
const { defaults } = require('jest-config');

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    preset: 'ts-jest',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mjs'],
    testEnvironment: path.join(__dirname, 'prisma', 'prisma-test-environment.mjs'),
    collectCoverageFrom: ['src'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

module.exports = config;
