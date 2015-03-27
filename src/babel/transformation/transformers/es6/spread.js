import includes from "lodash/collection/includes";
import * as t from "../../../types";

function getSpreadLiteral(spread, scope) {
  if (scope.file.isLoose("es6.spread")) {
    return spread.argument;
  } else {
    return scope.toArray(spread.argument, true);
  }
}

function hasSpread(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (t.isSpreadElement(nodes[i])) {
      return true;
    }
  }
  return false;
}

function build(props, scope) {
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
}

export var check = t.isSpreadElement;

export function ArrayExpression(node, parent, scope) {
  var elements = node.elements;
  if (!hasSpread(elements)) return;

  var nodes = build(elements, scope);
  var first = nodes.shift();

  if (!t.isArrayExpression(first)) {
    nodes.unshift(first);
    first = t.arrayExpression([]);
  }

  return t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes);
}

export function CallExpression(node, parent, scope) {
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

  if (this.get("callee").isMemberExpression()) {
    var temp = scope.generateMemoisedReference(callee.object);
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
}

export function NewExpression(node, parent, scope, file) {
  var args = node.arguments;
  if (!hasSpread(args)) return;

  var nodes = build(args, scope);

  var context = t.arrayExpression([t.literal(null)]);

  args = t.callExpression(t.memberExpression(context, t.identifier("concat")), nodes);

  return t.newExpression(
    t.callExpression(
      t.memberExpression(file.addHelper("bind"), t.identifier("apply")),
      [node.callee, args]
    ),
    []
  );
}
