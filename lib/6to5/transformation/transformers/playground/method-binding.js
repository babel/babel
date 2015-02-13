"use strict";

var t = require("../../../types");

exports.playground = true;

exports.BindMemberExpression = function (node, parent, scope) {
  var object = node.object;
  var prop   = node.property;

  var temp = scope.generateTempBasedOnNode(node.object);
  if (temp) object = temp;

  var call = t.callExpression(
    t.memberExpression(t.memberExpression(object, prop), t.identifier("bind")),
    [object].concat(node.arguments)
  );

  if (temp) {
    return t.sequenceExpression([
      t.assignmentExpression("=", temp, node.object),
      call
    ]);
  } else {
    return call;
  }
};

exports.BindFunctionExpression = function (node, parent, scope) {
  var buildCall = function (args) {
    var param = scope.generateUidIdentifier("val");
    return t.functionExpression(null, [param], t.blockStatement([
      t.returnStatement(t.callExpression(t.memberExpression(param, node.callee), args))
    ]));
  };

  var temp = scope.generateTemp("args");

  return t.sequenceExpression([
    t.assignmentExpression("=", temp, t.arrayExpression(node.arguments)),
    buildCall(node.arguments.map(function (node, i) {
      return t.memberExpression(temp, t.literal(i), true);
    }))
  ]);
};
