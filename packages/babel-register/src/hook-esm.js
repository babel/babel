"use strict";

const name = "_BABEL_ESM_REGISTER";
let esmRevert;

exports.register = function register(client, opts = {}) {
  esmRevert = global[name].register(client, opts);
};

exports.revert = function revert() {
  if (esmRevert) esmRevert();
};
