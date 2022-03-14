// TODO: Move this file to index.js in Babel 8

"use strict";

const [major, minor] = process.versions.node.split(".").map(Number);

if (major < 12 || (major === 12 && minor < 3)) {
  throw new Error(
    "@babel/register/experimental-worker requires Node.js >= 12.3.0",
  );
}

const hook = require("./hook");
const { WorkerClient } = require("./worker-client");

const register = hook.register.bind(null, new WorkerClient());

module.exports = Object.assign(register, {
  revert: hook.revert,
  default: register,
  __esModule: true,
});

if (!require("./is-in-register-worker").isInRegisterWorker) {
  register();
}
