"use strict";

const setup = require("./hook-common");
const { addHook } = require("pirates");
let piratesRevert;

exports.register = function register(clientType, opts = {}) {
  const { client, compile } = setup(clientType, opts);

  if (piratesRevert) piratesRevert();

  piratesRevert = addHook(compile, {
    exts: opts.extensions ?? client.getDefaultExtensions(),
    ignoreNodeModules: false,
  });
};

exports.revert = function revert() {
  if (piratesRevert) piratesRevert();
};
