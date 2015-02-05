"use strict";

var t = require("../../../types");

var isConsole = t.buildMatchMemberExpression("console", true);

exports.optional = true;

exports.CallExpression = function (node, parent, scope) {
  if (isConsole(node.callee)) {
    this.remove();
  }
};
