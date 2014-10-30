var util = require("../util");
var b    = require("../builders");
var _    = require("lodash");

var getSpreadLiteral = function (spread, file) {
  var literal = spread.argument;
  if (literal.type !== "ArrayExpression") {
    literal = util.template("call", {
      OBJECT: file.addDeclaration("slice"),
      CONTEXT: literal
    });
  }
  return literal;
};

var hasSpread = function (nodes) {
  var has = false;
  _.each(nodes, function (node) {
    if (node.type === "SpreadElement") {
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
    nodes.push(b.arrayExpression(_props));
    _props = [];
  };

  _.each(props, function (prop) {
    if (prop.type === "SpreadElement") {
      push();
      nodes.push(getSpreadLiteral(prop, file));
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

  return b.callExpression(b.memberExpression(first, b.identifier("concat"), false), nodes);
};

exports.CallExpression = function (node, parent, file) {
  var args = node.arguments;
  if (!hasSpread(args)) return;

  var contextLiteral = b.literal(null);

  node.arguments = [];

  var nodes = build(args, file);
  var first = nodes.shift();

  if (nodes.length) {
    node.arguments.push(b.callExpression(b.memberExpression(first, b.identifier("concat"), false), nodes));
  } else {
    node.arguments.push(first);
  }

  var callee = node.callee;

  if (callee.type === "MemberExpression") {
    contextLiteral = callee.object;

    if (callee.computed) {
      callee.object = b.memberExpression(callee.object, callee.property, true);
      callee.property = b.identifier("apply");
      callee.computed = false;
    } else {
      callee.property = b.memberExpression(callee.property, b.identifier("apply"), false);
    }
  } else {
    node.callee = b.memberExpression(node.callee, b.identifier("apply"), false);
  }

  node.arguments.unshift(contextLiteral);
};
