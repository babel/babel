// TODO: Remove this file in Babel 8

"use strict";

const hook = require("./hook-cjs");

function register(opts = {}) {
  return hook.register("LocalClient", { ...opts });
}

module.exports = Object.assign(register, {
  revert: hook.revert,
  default: register,
});
