"use strict";

var t = require("../../../types");

var isConsole = t.buildMatchMemberExpression("console", true);

exports.optional = true;

exports.CallExpression = function (node, parent) {
  if (isConsole(node.callee)) {
    if (t.isExpressionStatement(parent)) {
      this.parentPath.remove();
    } else {
      this.remove();
    }
  }
};
