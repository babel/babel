"use strict";

var util     = require("../../../util");
var core     = require("core-js/library");
var t        = require("../../../types");
var has      = require("lodash/object/has");
var contains = require("lodash/collection/contains");

var coreHas = function (node) {
  return node.name !== "_" && has(core, node.name);
};

var ALIASABLE_CONSTRUCTORS = [
  "Symbol",
  "Promise",
  "Map",
  "WeakMap",
  "Set",
  "WeakSet"
];

var astVisitor = {
  enter: function (node, parent, scope, context, file) {
    var prop;

    if (t.isMemberExpression(node) && t.isReferenced(node, parent)) {
      // Array.from -> _core.Array.from
      var obj = node.object;
      prop = node.property;

      if (!t.isReferenced(obj, node)) return;

      if (!node.computed && coreHas(obj) && has(core[obj.name], prop.name) && !scope.getBinding(obj.name)) {
        context.skip();
        return t.prependToMemberExpression(node, file.get("coreIdentifier"));
      }
    } else if (t.isReferencedIdentifier(node, parent) && !t.isMemberExpression(parent) && contains(ALIASABLE_CONSTRUCTORS, node.name) && !scope.getBinding(node.name)) {
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

exports.manipulateOptions = function (opts) {
  if (opts.whitelist.length) opts.whitelist.push("es6.modules");
};

exports.ast = {
  enter: function (ast, file) {
    file.setDynamic("runtimeIdentifier", function () {
      return file.addImport("6to5-runtime/helpers", "to5Helpers");
    });

    file.setDynamic("coreIdentifier", function () {
      return file.addImport("6to5-runtime/core-js", "core");
    });

    file.setDynamic("regeneratorIdentifier", function () {
      return file.addImport("6to5-runtime/regenerator", "regeneratorRuntime");
    });
  },

  after: function (ast, file) {
    file.scope.traverse(ast, astVisitor, file);
  }
};

exports.Identifier = function (node, parent, scope, context, file) {
  if (node.name === "regeneratorRuntime" && t.isReferenced(node, parent)) {
    return file.get("regeneratorIdentifier");
  }
};
