import includes from "lodash/collection/includes";
import traverse from "../../../../traversal";
import * as util from  "../../../../util";
import has from "lodash/object/has";
import * as t from "../../../../types";
import definitions from "./definitions";

var isSymbolIterator = t.buildMatchMemberExpression("Symbol.iterator");

const RUNTIME_MODULE_NAME = "babel-runtime";

var astVisitor = traverse.explode({
  Identifier(node, parent, scope, file) {
    if (!this.isReferenced()) return;
    if (t.isMemberExpression(parent)) return;
    if (!has(definitions.builtins, node.name)) return;
    if (scope.getBindingIdentifier(node.name)) return;

    // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
    var modulePath = definitions.builtins[node.name];
    return file.addImport(`${RUNTIME_MODULE_NAME}/core-js/${modulePath}`, node.name, "absoluteDefault");
  },

  CallExpression(node, parent, scope, file) {
    // arr[Symbol.iterator]() -> _core.$for.getIterator(arr)

    var callee = node.callee;
    if (node.arguments.length) return;

    if (!t.isMemberExpression(callee)) return;
    if (!callee.computed) return;

    var prop = callee.property;
    if (!isSymbolIterator(prop)) return;

    return t.callExpression(file.addImport(`${RUNTIME_MODULE_NAME}/core-js/get-iterator`, "getIterator", "absoluteDefault"), [callee.object]);
  },

  BinaryExpression(node, parent, scope, file) {
    // Symbol.iterator in arr -> core.$for.isIterable(arr)

    if (node.operator !== "in") return;

    var left = node.left;
    if (!isSymbolIterator(left)) return;

    return t.callExpression(
      file.addImport(`${RUNTIME_MODULE_NAME}/core-js/is-iterable`, "isIterable", "absoluteDefault"),
      [node.right]
    );
  },

  MemberExpression: {
    enter(node, parent, scope, file) {
      // Array.from -> _core.Array.from

      if (!this.isReferenced()) return;

      var obj = node.object;
      var prop = node.property;

      if (!t.isReferenced(obj, node)) return;

      if (node.computed) return;

      if (!has(definitions.methods, obj.name)) return;

      var methods = definitions.methods[obj.name];
      if (!has(methods, prop.name)) return;

      if (scope.getBindingIdentifier(obj.name)) return;

      var modulePath = methods[prop.name];
      return file.addImport(`${RUNTIME_MODULE_NAME}/core-js/${modulePath}`, `${obj.name}$${prop.name}`, "absoluteDefault");
    },

    exit(node, parent, scope, file) {
      if (!this.isReferenced()) return;

      var prop = node.property;
      var obj  = node.object;

      if (!has(definitions.builtins, obj.name)) return;
      if (scope.getBindingIdentifier(obj.name)) return;

      var modulePath = definitions.builtins[obj.name];
      return t.memberExpression(
        file.addImport(`${RUNTIME_MODULE_NAME}/core-js/${modulePath}`, `${obj.name}`, "absoluteDefault"),
        prop
      );
    }
  }
});

exports.metadata = {
  optional: true
};

exports.Program = function (node, parent, scope, file) {
  this.traverse(astVisitor, file);
};

exports.pre = function (file) {
  file.set("helperGenerator", function (name) {
    return file.addImport(`${RUNTIME_MODULE_NAME}/helpers/${name}`, name, "absoluteDefault");
  });

  file.setDynamic("regeneratorIdentifier", function () {
    return file.addImport(`${RUNTIME_MODULE_NAME}/regenerator`, "regeneratorRuntime", "absoluteDefault");
  });
};

exports.Identifier = function (node, parent, scope, file) {
  if (this.isReferencedIdentifier({ name: "regeneratorRuntime" })) {
    return file.get("regeneratorIdentifier");
  }
};
