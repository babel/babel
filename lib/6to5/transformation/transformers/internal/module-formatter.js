"use strict";

var useStrict = require("../../helpers/use-strict");

exports.post = function (file) {
  if (!file.transformers["es6.modules"].canRun()) return;

  var program = file.ast.program;

  useStrict.wrap(program, function () {
    program.body = file.dynamicImports.concat(program.body);
  });

  if (file.moduleFormatter.transform) {
    file.moduleFormatter.transform(program);
  }
};
