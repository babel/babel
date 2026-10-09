// @ts-check

/** @type {import('jest').Config} */
const config = {
  runner: "jest-light-runner",
  testEnvironment: "node",
  // https://github.com/nodejs/node/pull/58588#issuecomment-2961692890
  testTimeout: 10000,
  // Disable transform for test files since they are already transformed by the convert step in regenerator.js.
  transform: {},
};

module.exports = config;
