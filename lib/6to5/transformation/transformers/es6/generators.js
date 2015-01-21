"use strict";

var regenerator = require("regenerator-6to5");

exports.ast = {
  before: function (ast, file) {
    regenerator.transform(ast, {
      includeRuntime: file.opts.includeRegenerator && "if used"
    });
  }
};
