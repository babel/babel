// https://github.com/zenparsing/es-abstract-refs

var util = require("../../util");
var t    = require("../../types");

var container = function (parent, call, ret) {
  if (t.isExpressionStatement(parent)) {
    // we don't need to worry about return values
    return call;
  } else {
    return t.sequenceExpression([call, ret]);
  }
};

exports.AssignmentExpression = function (node, parent) {
  var left = node.left;
  if (!t.isVirtualPropertyExpression(left)) return;

  var right = node.right;

  var call = util.template("abstract-expression-set", {
    PROPERTY: left.property,
    OBJECT:   left.object,
    VALUE:    right
  });

  return container(parent, call, right);
};

exports.UnaryExpression = function (node, parent) {
  var arg = node.argument;
  if (!t.isVirtualPropertyExpression(arg)) return;
  if (node.operator !== "delete") return;

  var call = util.template("abstract-expression-delete", {
    PROPERTY: arg.property,
    OBJECT:   arg.object
  });

  return container(parent, call, t.literal(true));
};

exports.CallExpression = function (node) {
  var callee = node.callee;
  if (!t.isVirtualPropertyExpression(callee)) return;

  var call = util.template("abstract-expression-call", {
    PROPERTY: callee.property,
    OBJECT:   callee.object
  });
  call.arguments = call.arguments.concat(node.arguments);
  return call;
};

exports.VirtualPropertyExpression = function (node) {
  return util.template("abstract-expression-get", {
    PROPERTY: node.property,
    OBJECT:   node.object
  });
};
