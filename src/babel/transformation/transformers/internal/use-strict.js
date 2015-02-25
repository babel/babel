"use strict";

var t = require("../../../types");

exports.Program = function (program, parent, scope, file) {
  if (file.transformers.useStrict.canRun()) {
    program.body.unshift(t.expressionStatement(t.literal("use strict")));
  }
};
