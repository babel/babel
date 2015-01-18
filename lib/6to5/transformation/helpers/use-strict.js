"use strict";

var t = require("../../types");

exports.has = function (node) {
  var first = node.body[0];
  return t.isExpressionStatement(first) && t.isLiteral(first.expression, { value: "use strict" });
};

exports.wrap = function (node, callback) {
  var useStrictNode;
  if (exports.has(node)) {
    useStrictNode = node.body.shift();
  }

  callback();

  if (useStrictNode) {
    node.body.unshift(useStrictNode);
  }
};
