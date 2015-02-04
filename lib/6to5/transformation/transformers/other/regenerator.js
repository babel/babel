"use strict";

var regenerator = require("regenerator-6to5");
var t           = require("../../../types");

exports.check = function (node) {
  return t.isFunction(node) && (node.async || node.generator);
};

exports.ast = {
  before: function (ast, file) {
    regenerator.transform(ast, {
      includeRuntime: file.opts.includeRegenerator && "if used"
    });
  }
};
