"use strict";

var defineMap = require("../../helpers/define-map");
var t         = require("../../../types");

exports.check = function (node) {
  return t.isProperty(node) && (node.kind === "get" || node.kind === "set");
};

exports.ObjectExpression = function (node) {
  var mutatorMap = {};
  var hasAny = false;

  node.properties = node.properties.filter(function (prop) {
    if (prop.kind === "get" || prop.kind === "set") {
      hasAny = true;
      defineMap.push(mutatorMap, prop.key, prop.kind, prop.computed, prop.value);
      return false;
    } else {
      return true;
    }
  });

  if (!hasAny) return;

  return t.callExpression(
    t.memberExpression(t.identifier("Object"), t.identifier("defineProperties")),
    [node, defineMap.build(mutatorMap)]
  );
};
