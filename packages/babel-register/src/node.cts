// TODO: Remove this file in Babel 8

"use strict";

const hook = require("./hook.cjs");
const { LocalClient } = require("./worker-client.cjs");

const client = new LocalClient();
function register(opts = {}, regOpts = {}) {
  return hook.register(client, { ...opts }, { ...regOpts });
}

module.exports = Object.assign(register, {
  revert: hook.revert,
  default: register,
});
