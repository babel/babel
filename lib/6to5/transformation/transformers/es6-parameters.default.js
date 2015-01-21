"use strict";

var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");

exports.Function = function (node, parent, scope, context, file) {
  if (!node.defaults || !node.defaults.length) return;
  t.ensureBlock(node);

  var ids = node.params.map(function (param) {
    return t.getIds(param);
  });

  var iife = false;
  var def;

  var checkTDZ = function (param, def, ids) {
    var check = function (node, parent) {
      if (!t.isReferencedIdentifier(node, parent)) return;

      if (ids.indexOf(node.name) >= 0) {
        throw file.errorWithNode(node, "Temporal dead zone - accessing a variable before it's initialized");
      }

      if (scope.has(node.name, true)) {
        iife = true;
      }
    };

    check(def, node);

    if (!t.isPattern(param)) {
      traverse(def, { enter: check });
    }
  };

  for (var i = 0; i < node.defaults.length; i++) {
    def = node.defaults[i];
    if (!def) continue;

    var param = node.params[i];

    // temporal dead zone check - here we prevent accessing of params that
    // are to the right - ie. uninitialized parameters
    var rightIds = ids.slice(i);
    for (var i2 = 0; i2 < rightIds.length; i2++) {
      checkTDZ(param, def, rightIds[i2]);
    }

    // we're accessing a variable that's already defined within this function
    var has = scope.get(param.name, true);
    if (has && node.params.indexOf(has) < 0) {
      iife = true;
    }
  }

  var body = [];

  var argsIdentifier = t.identifier("arguments");
  argsIdentifier._ignoreAliasFunctions = true;

  var lastNonDefaultParam = 0;

  for (i = 0; i < node.defaults.length; i++) {
    def = node.defaults[i];
    if (!def) {
      lastNonDefaultParam = +i + 1;
      continue;
    }

    var defNode = util.template("default-parameter", {
      VARIABLE_NAME: node.params[i],
      DEFAULT_VALUE: def,
      ARGUMENT_KEY:  t.literal(+i),
      ARGUMENTS:     argsIdentifier
    }, true);
    defNode._blockHoist = node.defaults.length - i;
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

  node.defaults = [];
};
