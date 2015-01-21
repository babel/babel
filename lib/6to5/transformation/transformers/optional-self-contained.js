"use strict";

var traverse = require("../../traverse");
var util     = require("../../util");
var core     = require("core-js/library");
var t        = require("../../types");
var _        = require("lodash");

var coreHas = function (node) {
  return node.name !== "_" && _.has(core, node.name);
};

var ALIASABLE_CONSTRUCTORS = [
  "Symbol",
  "Promise",
  "Map",
  "WeakMap",
  "Set",
  "WeakSet"
];

var astTraverser = {
  enter: function (node, parent, scope, context, file) {
    var prop;

    if (t.isMemberExpression(node) && t.isReferenced(node, parent)) {
      // Array.from -> _core.Array.from
      var obj = node.object;
      prop = node.property;

      if (!t.isReferenced(obj, node)) return;

      if (!node.computed && coreHas(obj) && _.has(core[obj.name], prop.name)) {
        context.skip();
        return t.prependToMemberExpression(node, file.get("coreIdentifier"));
      }
    } else if (t.isReferencedIdentifier(node, parent) && !t.isMemberExpression(parent) && _.contains(ALIASABLE_CONSTRUCTORS, node.name)) {
      // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
      return t.memberExpression(file.get("coreIdentifier"), node);
    } else if (t.isCallExpression(node)) {
      // arr[Symbol.iterator]() -> _core.$for.getIterator(arr)

      if (node.arguments.length) return;

      var callee = node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (!callee.computed) return;

      prop = callee.property;
      if (!t.isIdentifier(prop.object, { name: "Symbol" })) return;
      if (!t.isIdentifier(prop.property, { name: "iterator" })) return;

      return util.template("corejs-iterator", {
        CORE_ID: file.get("coreIdentifier"),
        VALUE:   callee.object
      });
    }
  }
};

exports.optional = true;

exports.ast = {
  enter: function (ast, file) {
    file.set("runtimeIdentifier", file.addImport("6to5-runtime/helpers", "to5Runtime"));
    file.set("coreIdentifier", file.addImport("6to5-runtime/core-js", "core"));
    file.set("regeneratorIdentifier", file.addImport("6to5-runtime/regenerator", "regeneratorRuntime"));
  },

  exit: function (ast, file) {
    traverse(ast, astTraverser, null, file);
  }
};

exports.Identifier = function (node, parent, scope, context, file) {
  if (node.name === "regeneratorRuntime" && t.isReferenced(node, parent)) {
    return file.get("regeneratorIdentifier");
  }
};
