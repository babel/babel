"use strict";

const { getCompileFunction } = require("./hook-common");
const { addHook } = require("pirates");
let piratesRevert;

exports.register = function register(client, opts = {}) {
  if (piratesRevert) piratesRevert();

  piratesRevert = addHook(getCompileFunction(client));

  client.setOptions(opts);
};

exports.revert = function revert() {
  if (piratesRevert) piratesRevert();
};
