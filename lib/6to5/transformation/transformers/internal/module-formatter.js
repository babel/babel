"use strict";

var useStrict = require("../../helpers/use-strict");

exports.Program = {
  exit: function (program, parent, scope, context, file) {
    if (!file.transformers["es6.modules"].canRun()) return;

    useStrict.wrap(program, function () {
      program.body = file.dynamicImports.concat(program.body);
    });

    if (file.moduleFormatter.transform) {
      file.moduleFormatter.transform(program);
    }
  }
};
