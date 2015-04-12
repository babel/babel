import includes from "lodash/collection/includes";
import * as util from  "../../../../util";
import has from "lodash/object/has";
import * as t from "../../../../types";
import definitions from "./definitions";

var isSymbolIterator = t.buildMatchMemberExpression("Symbol.iterator");

const RUNTIME_MODULE_NAME = "babel-runtime";

var astVisitor = {
  enter(node, parent, scope, file) {
    var prop;

    if (this.isMemberExpression() && this.isReferenced()) {
      // Array.from -> _core.Array.from
      var obj = node.object;
      prop = node.property;

      if (!t.isReferenced(obj, node)) return;

      if (node.computed) return;
      if (!has(definitions.methods, obj.name)) return;
      if (!has(definitions.methods[obj.name], prop.name)) return;
      if (scope.getBindingIdentifier(obj.name)) return;

      var modulePath = definitions.methods[obj.name][prop.name];
      return file.addImport(`${RUNTIME_MODULE_NAME}/core-js/${modulePath}`, `${obj.name}$${prop.name}`, true);
    } else if (this.isReferencedIdentifier() && !t.isMemberExpression(parent) && has(definitions.builtins, node.name) && !scope.getBindingIdentifier(node.name)) {
      // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
      var modulePath = definitions.builtins[node.name];
      return file.addImport(`${RUNTIME_MODULE_NAME}/core-js/${modulePath}`, node.name, true);
    } else if (this.isCallExpression()) {
      // arr[Symbol.iterator]() -> _core.$for.getIterator(arr)

      var callee = node.callee;
      if (node.arguments.length) return false;

      if (!t.isMemberExpression(callee)) return false;
      if (!callee.computed) return false;

      prop = callee.property;
      if (!isSymbolIterator(prop)) return false;

      return t.callExpression(file.addImport(`${RUNTIME_MODULE_NAME}/core-js/get-iterator`, "getIterator", true), [callee.object]);
    } else if (this.isBinaryExpression()) {
      // Symbol.iterator in arr -> core.$for.isIterable(arr)

      if (node.operator !== "in") return;

      var left = node.left;
      if (!isSymbolIterator(left)) return;

      return t.callExpression(file.addImport(`${RUNTIME_MODULE_NAME}/core-js/is-iterator`, "isIterable", true), [node.right]);
    }
  }
};

exports.metadata = {
  optional: true
};

exports.Program = function (node, parent, scope, file) {
  this.traverse(astVisitor, file);
};

exports.pre = function (file) {
  file.set("helperGenerator", function (name) {
    return file.addImport(`${RUNTIME_MODULE_NAME}/helpers/${name}`, name, true);
  });

  file.setDynamic("regeneratorIdentifier", function () {
    return file.addImport(`${RUNTIME_MODULE_NAME}/regenerator`, "regeneratorRuntime", true);
  });
};

exports.Identifier = function (node, parent, scope, file) {
  if (this.isReferencedIdentifier({ name: "regeneratorRuntime" })) {
    return file.get("regeneratorIdentifier");
  }
};
