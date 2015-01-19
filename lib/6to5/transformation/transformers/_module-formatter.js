"use strict";

var transform = require("../transform");

exports.ast = {
  exit: function (ast, file) {
    if (!transform.transformers.modules.canRun(file)) return;

    if (file.moduleFormatter.transform) {
      file.moduleFormatter.transform(ast);
    }
  }
};
