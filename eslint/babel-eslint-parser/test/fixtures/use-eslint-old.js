"use strict"

var Module = require('module');
var originalRequire = Module.prototype.require;

// Override to eslint-old
Module.prototype.require = function () {
  if (arguments[0] === "eslint") {
    arguments[0] = "eslint-old";
  }
  return originalRequire.apply(this, arguments);
};
