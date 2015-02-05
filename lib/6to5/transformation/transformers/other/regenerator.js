"use strict";

var regenerator = require("regenerator-6to5");

exports.check = function (node) {
  return t.isFunction(node) && (node.async || node.generator);
};

exports.Program = {
  enter: function (ast) {
    regenerator.transform(ast);
    this.stop();
  }
};
