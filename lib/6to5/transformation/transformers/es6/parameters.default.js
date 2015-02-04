"use strict";

var traverse = require("../../../traverse");
var util     = require("../../../util");
var t        = require("../../../types");

exports.check = function (node) {
  return t.isFunction(node) && hasDefaults(node);
};

var hasDefaults = function (node) {
  for (var i = 0; i < node.params.length; i++) {
    if (t.isAssignmentPattern(node.params[i])) return true;
  }
  return false;
};

var iifeVisitor = {
  enter: function (node, parent, scope, context, state) {
    if (t.isReferencedIdentifier(node, parent) && state.scope.hasOwnReference(node.name)) {
      state.iife = true;
      context.stop();
    }
  }
};

exports.Function = function (node, parent, scope) {
  if (!hasDefaults(node)) return;

  t.ensureBlock(node);

  var body = [];

  var argsIdentifier = t.identifier("arguments");
  argsIdentifier._ignoreAliasFunctions = true;

  var lastNonDefaultParam = 0;

  var state = { iife: false, scope: scope };

  for (var i = 0; i < node.params.length; i++) {
    var param = node.params[i];

    if (!t.isAssignmentPattern(param)) {
      lastNonDefaultParam = +i + 1;
      continue;
    }

    var left  = param.left;
    var right = param.right;

    node.params[i] = scope.generateUidIdentifier("x");

    if (!state.iife) {
      if (t.isIdentifier(right) && scope.hasOwnReference(right.name)) {
        state.iife = true;
      } else {
        traverse(right, iifeVisitor, scope, state);
      }
    }

    var defNode = util.template("default-parameter", {
      VARIABLE_NAME: left,
      DEFAULT_VALUE: right,
      ARGUMENT_KEY:  t.literal(+i),
      ARGUMENTS:     argsIdentifier
    }, true);
    defNode._blockHoist = node.params.length - i;
    body.push(defNode);
  }

  // we need to cut off all trailing default parameters
  node.params = node.params.slice(0, lastNonDefaultParam);

  if (state.iife) {
    var container = t.functionExpression(null, [], node.body, node.generator);
    container._aliasFunction = true;

    body.push(t.returnStatement(t.callExpression(container, [])));

    node.body = t.blockStatement(body);
  } else {
    node.body.body = body.concat(node.body.body);
  }
};
