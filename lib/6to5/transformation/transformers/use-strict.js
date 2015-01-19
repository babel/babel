"use strict";

var useStrict = require("../helpers/use-strict");
var t         = require("../../types");

exports.ast = {
  exit: function (ast) {
    if (!useStrict.has(ast.program)) {
      ast.program.body.unshift(t.expressionStatement(t.literal("use strict")));
    }
  }
};
