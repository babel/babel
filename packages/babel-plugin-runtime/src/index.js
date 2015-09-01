import definitions from "./definitions";

export default function ({ types: t }) {
  const RUNTIME_MODULE_NAME = "babel-runtime";

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  return {
    metadata: {
      group: "builtin-post-modules"
    },

    pre(file) {
      file.set("helperGenerator", function (name) {
        return file.addImport(`${RUNTIME_MODULE_NAME}/helpers/${name}`, name, "absoluteDefault");
      });

      file.setDynamic("regeneratorIdentifier", function () {
        return file.addImport(`${RUNTIME_MODULE_NAME}/regenerator`, "regeneratorRuntime", "absoluteDefault");
      });
    },

    visitor: {
      ReferencedIdentifier(node, parent, scope, file) {
        if (node.name === "regeneratorRuntime") {
          return file.get("regeneratorIdentifier");
        }

        if (t.isMemberExpression(parent)) return;
        if (!has(definitions.builtins, node.name)) return;
        if (scope.getBindingIdentifier(node.name)) return;

        // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
        var modulePath = definitions.builtins[node.name];
        return file.addImport(`${RUNTIME_MODULE_NAME}/core-js/${modulePath}`, node.name, "absoluteDefault");
      },

      CallExpression(node, parent, scope, file) {
        // arr[Symbol.iterator]() -> _core.$for.getIterator(arr)

        if (node.arguments.length) return;

        var callee = node.callee;
        if (!t.isMemberExpression(callee)) return;
        if (!callee.computed) return;
        if (!this.get("callee.property").matchesPattern("Symbol.iterator")) return;

        return t.callExpression(file.addImport(`${RUNTIME_MODULE_NAME}/core-js/get-iterator`, "getIterator", "absoluteDefault"), [callee.object]);
      },

      BinaryExpression(node, parent, scope, file) {
        // Symbol.iterator in arr -> core.$for.isIterable(arr)

        if (node.operator !== "in") return;
        if (!this.get("left").matchesPattern("Symbol.iterator")) return;

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

          // doesn't reference the global
          if (scope.getBindingIdentifier(obj.name)) return;

          // special case Object.defineProperty to not use core-js when using string keys
          if (obj.name === "Object" && prop.name === "defineProperty" && this.parentPath.isCallExpression()) {
            var call = this.parentPath.node;
            if (call.arguments.length === 3 && t.isLiteral(call.arguments[1])) return;
          }

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
    }
  };
}
