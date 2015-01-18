"use strict";

var nameMethod = require("../helpers/name-method");
var util       = require("../../util");
var t          = require("../../types");

exports.Property = function (node, parent, scope, context, file) {
  if (!node.method) return;

  node.method = false;

  nameMethod.property(node, file, scope);
};

exports.ObjectExpression = function (node) {
  var mutatorMap = {};
  var hasAny = false;

  node.properties = node.properties.filter(function (prop) {
    if (prop.kind === "get" || prop.kind === "set") {
      hasAny = true;
      util.pushMutatorMap(mutatorMap, prop.key, prop.kind, prop.computed, prop.value);
      return false;
    } else {
      return true;
    }
  });

  if (!hasAny) return;

  return t.callExpression(
    t.memberExpression(t.identifier("Object"), t.identifier("defineProperties")),
    [node, util.buildDefineProperties(mutatorMap)]
  );
};
