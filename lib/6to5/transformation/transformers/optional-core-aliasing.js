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

exports.optional = true;

exports.ast = {
  enter: function (ast, file) {
    file._coreId = file.addImport("core-js/library", "core");
  },

  exit: function (ast, file) {
    traverse(ast, {
      enter: function (node, parent, scope, context) {
        var prop;

        if (t.isMemberExpression(node) && t.isReferenced(node, parent)) {
          // Array.from -> _core.Array.from
          var obj = node.object;
          prop = node.property;

          if (!t.isReferenced(obj, node)) return;

          if (!node.computed && coreHas(obj) && _.has(core[obj.name], prop.name)) {
            context.skip();
            return t.prependToMemberExpression(node, file._coreId);
          }
        } else if (t.isReferencedIdentifier(node, parent) && !t.isMemberExpression(parent) && _.contains(ALIASABLE_CONSTRUCTORS, node.name) && !scope.get(node.name, true)) {
          // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
          return t.memberExpression(file._coreId, node);
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
            CORE_ID: file._coreId,
            VALUE:   callee.object
          });
        }
      }
    });
  }
};
