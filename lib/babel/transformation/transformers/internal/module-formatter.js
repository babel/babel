"use strict";

exports.Program = function (program, parent, scope, file) {
  if (!file.transformers["es6.modules"].canRun()) return;

  program.body = file.dynamicImports.concat(program.body);

  if (file.moduleFormatter.transform) {
    file.moduleFormatter.transform(program);
  }
};
