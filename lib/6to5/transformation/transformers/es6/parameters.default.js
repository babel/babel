"use strict";

var util = require("../../../util");
var t    = require("../../../types");

var hasDefaults = function (node) {
  for (var i = 0; i < node.params.length; i++) {
    if (t.isAssignmentPattern(node.params[i])) return true;
  }
  return false;
};

exports.Function = function (node, parent, scope) {
  if (!hasDefaults(node)) return;

  t.ensureBlock(node);

  var iife = false;
  var body = [];

  var argsIdentifier = t.identifier("arguments");
  argsIdentifier._ignoreAliasFunctions = true;

  var lastNonDefaultParam = 0;

  for (var i = 0; i < node.params.length; i++) {
    var param = node.params[i];

    if (!t.isAssignmentPattern(param)) {
      lastNonDefaultParam = +i + 1;
      continue;
    }

    var left  = param.left;
    var right = param.right;

    node.params[i] = scope.generateUidIdentifier("x");

    // we're accessing a variable that's already defined within this function
    var localDeclar = scope.get(left.name, true);
    if (localDeclar !== left) {
      iife = true;
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

  if (iife) {
    var container = t.functionExpression(null, [], node.body, node.generator);
    container._aliasFunction = true;

    body.push(t.returnStatement(t.callExpression(container, [])));

    node.body = t.blockStatement(body);
  } else {
    node.body.body = body.concat(node.body.body);
  }
};
