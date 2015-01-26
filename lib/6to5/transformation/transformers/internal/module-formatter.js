"use strict";

var useStrict = require("../../helpers/use-strict");
var transform = require("../../transform");

exports.ast = {
  exit: function (ast, file) {
    if (!file.transformers["es6.modules"].canRun()) return;

    useStrict.wrap(ast.program, function () {
      ast.program.body = file.dynamicImports.concat(ast.program.body);
    });

    if (file.moduleFormatter.transform) {
      file.moduleFormatter.transform(ast);
    }
  }
};
