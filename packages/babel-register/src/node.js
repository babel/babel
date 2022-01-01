// TODO: Remove this file in Babel 8

"use strict";

const hook = require("./hook");
const { LocalClient } = require("./worker-client");

const register = hook.register.bind(null, new LocalClient());

module.exports = Object.assign(register, {
  revert: hook.revert,
  default: register,
});
