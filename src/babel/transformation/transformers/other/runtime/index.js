import has from "lodash/object/has";
import * as t from "../../../../types";
import definitions from "./definitions";

const RUNTIME_MODULE_NAME = "babel-runtime";

export var metadata = {
  optional: true,
  group: "builtin-post-modules"
};

export function pre(file) {
  file.set("helperGenerator", function (name) {
    return file.addImport(`${RUNTIME_MODULE_NAME}/helpers/${name}`, name, "absoluteDefault");
  });

  file.setDynamic("regeneratorIdentifier", function () {
    return file.addImport(`${RUNTIME_MODULE_NAME}/regenerator`, "regeneratorRuntime", "absoluteDefault");
  });
}

export function ReferencedIdentifier(node, parent, scope, file) {
  if (node.name === "regeneratorRuntime") {
    return file.get("regeneratorIdentifier");
  }

  if (t.isMemberExpression(parent)) return;
  if (!has(definitions.builtins, node.name)) return;
  if (scope.getBindingIdentifier(node.name)) return;

  // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
  var modulePath = definitions.builtins[node.name];
  return file.addImport(`${RUNTIME_MODULE_NAME}/core-js/${modulePath}`, node.name, "absoluteDefault");
}

export function CallExpression(node, parent, scope, file) {
  // arr[Symbol.iterator]() -> _core.$for.getIterator(arr)

  if (node.arguments.length) return;

  var callee = node.callee;
  if (!t.isMemberExpression(callee)) return;
  if (!callee.computed) return;
  if (!this.get("callee.property").matchesPattern("Symbol.iterator")) return;

  return t.callExpression(file.addImport(`${RUNTIME_MODULE_NAME}/core-js/get-iterator`, "getIterator", "absoluteDefault"), [callee.object]);
}

export function BinaryExpression(node, parent, scope, file) {
  // Symbol.iterator in arr -> core.$for.isIterable(arr)

  if (node.operator !== "in") return;
  if (!this.get("left").matchesPattern("Symbol.iterator")) return;

  return t.callExpression(
    file.addImport(`${RUNTIME_MODULE_NAME}/core-js/is-iterable`, "isIterable", "absoluteDefault"),
    [node.right]
  );
}

export var MemberExpression = {
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
};
