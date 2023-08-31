// TODO: Remove this file in Babel 8

"use strict";

const hook = require("./hook.js");
const { LocalClient } = require("./worker-client.js");

const client = new LocalClient();
function register(opts = {}) {
  return hook.register(client, { ...opts });
}

module.exports = Object.assign(register, {
  revert: hook.revert,
  default: register,
});
