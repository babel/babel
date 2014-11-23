// https://github.com/zenparsing/es-abstract-refs

var util = require("../../util");
var t    = require("../../types");

exports.AssignmentExpression = function (node, parent) {
  var left = node.left;
  if (!t.isVirtualPropertyExpression(left)) return;

  return util.template("abstract-expression-set", {
    PROPERTY: left.property,
    OBJECT:   left.object,
    VALUE:    node.right
  });
};

exports.UnaryExpression = function (node, parent) {
  if (!t.isVirtualPropertyExpression(node.argument)) return;
  if (node.operator !== "delete") return;

  return util.template("abstract-expression-delete", {
    PROPERTY: node.property,
    OBJECT:   node.object
  });
};

exports.VirtualPropertyExpression = function (node) {
  return util.template("abstract-expression-get", {
    PROPERTY: node.property,
    OBJECT:   node.object
  });
};
