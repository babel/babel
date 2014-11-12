var t = require("../../types");
var _ = require("lodash");

var getSpreadLiteral = function (spread) {
  var literal = spread.argument;
  if (!t.isArrayExpression(literal)) {
    literal = t.callExpression(
      t.memberExpression(t.identifier("Array"), t.identifier("from")),
      [literal]
    );
  }
  return literal;
};

var hasSpread = function (nodes) {
  var has = false;
  _.each(nodes, function (node) {
    if (t.isSpreadElement(node)) {
      has = true;
      return false;
    }
  });
  return has;
};

var build = function (props, file) {
  var nodes = [];

  var _props = [];

  var push = function () {
    if (!_props.length) return;
    nodes.push(t.arrayExpression(_props));
    _props = [];
  };

  _.each(props, function (prop) {
    if (t.isSpreadElement(prop)) {
      push();
      nodes.push(getSpreadLiteral(prop));
    } else {
      _props.push(prop);
    }
  });

  push();

  return nodes;
};

exports.ArrayExpression = function (node, parent, file) {
  var elements = node.elements;
  if (!hasSpread(elements)) return;

  var nodes = build(elements, file);
  var first = nodes.shift();

  if (!nodes.length) return first;

  return t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes);
};

exports.CallExpression = function (node, parent, file) {
  var args = node.arguments;
  if (!hasSpread(args)) return;

  var contextLiteral = t.literal(null);

  node.arguments = [];

  var nodes = build(args, file);
  var first = nodes.shift();

  if (nodes.length) {
    node.arguments.push(t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes));
  } else {
    node.arguments.push(first);
  }

  var callee = node.callee;

  if (t.isMemberExpression(callee)) {
    contextLiteral = callee.object;

    if (callee.computed) {
      callee.object = t.memberExpression(callee.object, callee.property, true);
      callee.property = t.identifier("apply");
      callee.computed = false;
    } else {
      callee.property = t.memberExpression(callee.property, t.identifier("apply"));
    }
  } else {
    node.callee = t.memberExpression(node.callee, t.identifier("apply"));
  }

  node.arguments.unshift(contextLiteral);
};

exports.NewExpression = function (node, parent, file) {
  var args = node.arguments;
  if (!hasSpread(args)) return;

  var nodes = build(args, file);
  var first = nodes.shift();

  if (nodes.length) {
    args = t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes);
  } else {
    args = first;
  }

  return t.callExpression(file.addDeclaration("apply-constructor"), [node.callee, args]);
};
