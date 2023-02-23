"use strict";

const name = "_BABEL_ESM_REGISTER";

exports.register = function register(client, opts = {}) {
  global[name].register(client, opts);
};

exports.revert = function revert() {
  global[name].revert();
};
