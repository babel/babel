"use strict";

var regenerator = require("regenerator");

exports.ast = {
  before: function (ast, file) {
    regenerator.transform(ast, {
      includeRuntime: file.opts.includeRegenerator && "if used"
    });
  }
};
