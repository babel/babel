import definitions from "./definitions";
import getHelper from "babel-helpers";

export default function ({ types: t }) {
  function getRuntimeModuleName(opts) {
    return opts.moduleName || "babel-runtime";
  }

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  let HELPER_BLACKLIST = [
    "interopRequireWildcard", "interopRequireDefault",
    "specRequireInterop", "specImportCheck"
  ];

  function shouldSkipTransform(path) {
    return !!path.find((p) => p.node._noTransform);
  }

  return {
    pre(file) {
      const moduleName = getRuntimeModuleName(this.opts);

      if (this.opts.helpers !== false) {
        file.set("helperGenerator", function (name) {
          if (HELPER_BLACKLIST.indexOf(name) < 0) {
            return file.addImport(`${moduleName}/helpers/${name}`, "default", name);
          } else {
            const node = getHelper(name);
            node._noTransform = true;
            return node;
          }
        });
      }

      this.setDynamic("regeneratorIdentifier", function () {
        return file.addImport(`${moduleName}/regenerator`, "default", "regeneratorRuntime");
      });
    },

    visitor: {
      ReferencedIdentifier(path, state) {
        let { node, parent, scope } = path;

        if (node.name === "regeneratorRuntime" && state.opts.regenerator !== false) {
          path.replaceWith(state.get("regeneratorIdentifier"));
          return;
        }

        if (state.opts.polyfill === false) return;

        if (t.isMemberExpression(parent)) return;
        if (!has(definitions.builtins, node.name)) return;
        if (scope.getBindingIdentifier(node.name)) return;
        if (shouldSkipTransform(path)) return;

        // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
        const moduleName = getRuntimeModuleName(state.opts);
        path.replaceWith(state.addImport(
          `${moduleName}/core-js/${definitions.builtins[node.name]}`,
          "default",
          node.name
        ));
      },

      // arr[Symbol.iterator]() -> _core.$for.getIterator(arr)
      CallExpression(path, state) {
        if (state.opts.polyfill === false) return;

        // we can't compile this
        if (path.node.arguments.length) return;

        let callee = path.node.callee;
        if (!t.isMemberExpression(callee)) return;
        if (!callee.computed) return;
        if (!path.get("callee.property").matchesPattern("Symbol.iterator")) return;
        if (shouldSkipTransform(path)) return;

        const moduleName = getRuntimeModuleName(state.opts);
        path.replaceWith(t.callExpression(
          state.addImport(
            `${moduleName}/core-js/get-iterator`,
            "default",
            "getIterator"
          ),
          [callee.object]
        ));
      },

      // Symbol.iterator in arr -> core.$for.isIterable(arr)
      BinaryExpression(path, state) {
        if (state.opts.polyfill === false) return;

        if (path.node.operator !== "in") return;
        if (!path.get("left").matchesPattern("Symbol.iterator")) return;
        if (shouldSkipTransform(path)) return;

        const moduleName = getRuntimeModuleName(state.opts);
        path.replaceWith(t.callExpression(
          state.addImport(
            `${moduleName}/core-js/is-iterable`,
            "default",
            "isIterable"
          ),
          [path.node.right]
        ));
      },

      // Array.from -> _core.Array.from
      MemberExpression: {
        enter(path, state) {
          if (state.opts.polyfill === false) return;
          if (!path.isReferenced()) return;

          let { node } = path;
          let obj = node.object;
          let prop = node.property;

          if (!t.isReferenced(obj, node)) return;
          if (node.computed) return;
          if (!has(definitions.methods, obj.name)) return;

          let methods = definitions.methods[obj.name];
          if (!has(methods, prop.name)) return;

          // doesn't reference the global
          if (path.scope.getBindingIdentifier(obj.name)) return;

          // special case Object.defineProperty to not use core-js when using string keys
          if (obj.name === "Object" && prop.name === "defineProperty" && path.parentPath.isCallExpression()) {
            let call = path.parentPath.node;
            if (call.arguments.length === 3 && t.isLiteral(call.arguments[1])) return;
          }
          if (shouldSkipTransform(path)) return;

          const moduleName = getRuntimeModuleName(state.opts);
          path.replaceWith(state.addImport(
            `${moduleName}/core-js/${methods[prop.name]}`,
            "default",
            `${obj.name}$${prop.name}`
          ));
        },

        exit(path, state) {
          if (state.opts.polyfill === false) return;
          if (!path.isReferenced()) return;

          let { node } = path;
          let obj = node.object;

          if (!has(definitions.builtins, obj.name)) return;
          if (path.scope.getBindingIdentifier(obj.name)) return;
          if (shouldSkipTransform(path)) return;

          const moduleName = getRuntimeModuleName(state.opts);
          path.replaceWith(t.memberExpression(
            state.addImport(
              `${moduleName}/core-js/${definitions.builtins[obj.name]}`,
              "default",
              obj.name
            ),
            node.property,
            node.computed
          ));
        }
      }
    }
  };
}

export { definitions };
