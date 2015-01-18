"use strict";

var buildComprehension = require("../helpers/build-comprehension");
var t                  = require("../../types");

exports.experimental = true;

exports.ComprehensionExpression = function (node) {
  if (!node.generator) return;

  var body = [];
  var container = t.functionExpression(null, [], t.blockStatement(body), true);
  container._aliasFunction = true;

  body.push(buildComprehension(node, function () {
    return t.expressionStatement(t.yieldExpression(node.body));
  }));

  return t.callExpression(container, []);
};
