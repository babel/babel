var t = require("../../types");

var getSpreadLiteral = function (spread, file) {
  return file.toArray(spread.argument);
};

var hasSpread = function (nodes) {
  for (var i in nodes) {
    if (t.isSpreadElement(nodes[i])) {
      return true;
    }
  }
  return false;
};

var build = function (props, file) {
  var nodes = [];

  var _props = [];

  var push = function () {
    if (!_props.length) return;
    nodes.push(t.arrayExpression(_props));
    _props = [];
  };

  for (var i in props) {
    var prop = props[i];
    if (t.isSpreadElement(prop)) {
      push();
      nodes.push(getSpreadLiteral(prop, file));
    } else {
      _props.push(prop);
    }
  }

  push();

  return nodes;
};

exports.ArrayExpression = function (node, parent, file) {
  var elements = node.elements;
  if (!hasSpread(elements)) return;

  var nodes = build(elements, file);
  var first = nodes.shift();

  if (!t.isArrayExpression(first)) {
    nodes.unshift(first);
    first = t.arrayExpression([]);
  }

  return t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes);
};

exports.CallExpression = function (node, parent, file, scope) {
  var args = node.arguments;
  if (!hasSpread(args)) return;

  var contextLiteral = t.literal(null);

  node.arguments = [];

  var nodes;
  if (args.length === 1 && args[0].argument.name === 'arguments') {
    nodes = [args[0].argument];
  } else {
    nodes = build(args, file);
  }
  var first = nodes.shift();

  if (nodes.length) {
    node.arguments.push(t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes));
  } else {
    node.arguments.push(first);
  }

  var callee = node.callee;
  var temp;

  if (t.isMemberExpression(callee)) {
    contextLiteral = callee.object;

    if (t.isDynamic(contextLiteral)) {
      temp = contextLiteral = scope.generateTemp(file);
      callee.object = t.assignmentExpression("=", temp, callee.object);
    }

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
