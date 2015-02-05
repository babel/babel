"use strict";

var buildComprehension = require("../../helpers/build-comprehension");
var traverse           = require("../../../traversal");
var util               = require("../../../util");
var t                  = require("../../../types");

exports.experimental = true;

exports.ComprehensionExpression = function (node, parent, scope, file) {
  var callback = array;
  if (node.generator) callback = generator;
  return callback(node, parent, scope, file);
};

var generator = function (node) {
  var body = [];
  var container = t.functionExpression(null, [], t.blockStatement(body), true);
  container._aliasFunction = true;

  body.push(buildComprehension(node, function () {
    return t.expressionStatement(t.yieldExpression(node.body));
  }));

  return t.callExpression(container, []);
};

var array = function (node, parent, scope, file) {
  var uid = scope.generateUidBasedOnNode(parent, file);

  var container = util.template("array-comprehension-container", {
    KEY: uid
  });
  container.callee._aliasFunction = true;

  var block = container.callee.body;
  var body  = block.body;

  if (traverse.hasType(node, scope, "YieldExpression", t.FUNCTION_TYPES)) {
    container.callee.generator = true;
    container = t.yieldExpression(container, true);
  }

  var returnStatement = body.pop();

  body.push(buildComprehension(node, function () {
    return util.template("array-push", {
      STATEMENT: node.body,
      KEY:       uid
    }, true);
  }));
  body.push(returnStatement);

  return container;
};
