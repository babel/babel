"use strict";

var includes = require("lodash/collection/includes");
var t        = require("../../../types");

exports.check = t.isSpreadElement;

var getSpreadLiteral = function (spread, scope) {
  return scope.toArray(spread.argument, true);
};

var hasSpread = function (nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (t.isSpreadElement(nodes[i])) {
      return true;
    }
  }
  return false;
};

var build = function (props, scope) {
  var nodes = [];

  var _props = [];

  var push = function () {
    if (!_props.length) return;
    nodes.push(t.arrayExpression(_props));
    _props = [];
  };

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (t.isSpreadElement(prop)) {
      push();
      nodes.push(getSpreadLiteral(prop, scope));
    } else {
      _props.push(prop);
    }
  }

  push();

  return nodes;
};

exports.ArrayExpression = function (node, parent, scope) {
  var elements = node.elements;
  if (!hasSpread(elements)) return;

  var nodes = build(elements, scope);
  var first = nodes.shift();

  if (!t.isArrayExpression(first)) {
    nodes.unshift(first);
    first = t.arrayExpression([]);
  }

  return t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes);
};

exports.CallExpression = function (node, parent, scope) {
  var args = node.arguments;
  if (!hasSpread(args)) return;

  var contextLiteral = t.identifier("undefined");

  node.arguments = [];

  var nodes;
  if (args.length === 1 && args[0].argument.name === "arguments") {
    nodes = [args[0].argument];
  } else {
    nodes = build(args, scope);
  }

  var first = nodes.shift();
  if (nodes.length) {
    node.arguments.push(t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes));
  } else {
    node.arguments.push(first);
  }

  var callee = node.callee;

  if (t.isMemberExpression(callee)) {
    var temp = scope.generateTempBasedOnNode(callee.object);
    if (temp) {
      callee.object = t.assignmentExpression("=", temp, callee.object);
      contextLiteral = temp;
    } else {
      contextLiteral = callee.object;
    }
    t.appendToMemberExpression(callee, t.identifier("apply"));
  } else {
    node.callee = t.memberExpression(node.callee, t.identifier("apply"));
  }

  node.arguments.unshift(contextLiteral);
};

exports.NewExpression = function (node, parent, scope, file) {
  var args = node.arguments;
  if (!hasSpread(args)) return;

  var nativeType = t.isIdentifier(node.callee) && includes(t.NATIVE_TYPE_NAMES, node.callee.name);

  var nodes = build(args, scope);

  if (nativeType) {
    nodes.unshift(t.arrayExpression([t.literal(null)]));
  }

  var first = nodes.shift();

  if (nodes.length) {
    args = t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes);
  } else {
    args = first;
  }

  if (nativeType) {
    return t.newExpression(
      t.callExpression(
        t.memberExpression(file.addHelper("bind"), t.identifier("apply")),
        [node.callee, args]
      ),
      []
    );
  } else {
    return t.callExpression(file.addHelper("apply-constructor"), [node.callee, args]);
  }
};
