import { addDefault, isModule } from "babel-helper-module-imports";

import definitions from "./definitions";

export default function({ types: t }) {
  function getRuntimeModuleName(opts) {
    return opts.moduleName || "babel-runtime";
  }

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  const HEADER_HELPERS = ["interopRequireWildcard", "interopRequireDefault"];

  return {
    pre(file) {
      const moduleName = getRuntimeModuleName(this.opts);

      if (this.opts.helpers !== false) {
        const baseHelpersDir = this.opts.useBuiltIns
          ? "helpers/builtin"
          : "helpers";
        const helpersDir = this.opts.useESModules
          ? `${baseHelpersDir}/es6`
          : baseHelpersDir;
        file.set("helperGenerator", name => {
          const isInteropHelper = HEADER_HELPERS.indexOf(name) !== -1;

          // Explicitly set the CommonJS interop helpers to their reserve
          // blockHoist of 4 so they are guaranteed to exist
          // when other things used them to import.
          const blockHoist =
            isInteropHelper && !isModule(file.path) ? 4 : undefined;

          return this.addDefaultImport(
            `${moduleName}/${helpersDir}/${name}`,
            name,
            blockHoist,
          );
        });
      }

      if (this.opts.polyfill && this.opts.useBuiltIns) {
        throw new Error(
          "The polyfill option conflicts with useBuiltIns; use one or the other",
        );
      }

      this.moduleName = moduleName;

      const cache = new Map();

      this.addDefaultImport = (source, nameHint, blockHoist) => {
        // If something on the page adds a helper when the file is an ES6
        // file, we can't reused the cached helper name after things have been
        // transformed because it has almost certainly been renamed.
        const cacheKey = isModule(file.path);
        const key = `${source}:${nameHint}:${cacheKey || ""}`;

        let cached = cache.get(key);
        if (cached) {
          cached = t.cloneDeep(cached);
        } else {
          cached = addDefault(file.path, source, {
            importedInterop: "uncompiled",
            nameHint,
            blockHoist,
          });

          cache.set(key, cached);
        }
        return cached;
      };
    },

    visitor: {
      ReferencedIdentifier(path, state) {
        const { node, parent, scope } = path;
        if (
          node.name === "regeneratorRuntime" &&
          state.opts.regenerator !== false
        ) {
          path.replaceWith(
            this.addDefaultImport(
              `${this.moduleName}/regenerator`,
              "regeneratorRuntime",
            ),
          );
          return;
        }

        if (state.opts.polyfill === false || state.opts.useBuiltIns) return;

        if (t.isMemberExpression(parent)) return;
        if (!has(definitions.builtins, node.name)) return;
        if (scope.getBindingIdentifier(node.name)) return;

        // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
        const moduleName = getRuntimeModuleName(state.opts);
        path.replaceWith(
          this.addDefaultImport(
            `${moduleName}/core-js/${definitions.builtins[node.name]}`,
            node.name,
          ),
        );
      },

      // arr[Symbol.iterator]() -> _core.$for.getIterator(arr)
      CallExpression(path, state) {
        if (state.opts.polyfill === false || state.opts.useBuiltIns) return;

        // we can't compile this
        if (path.node.arguments.length) return;

        const callee = path.node.callee;
        if (!t.isMemberExpression(callee)) return;
        if (!callee.computed) return;
        if (!path.get("callee.property").matchesPattern("Symbol.iterator")) {
          return;
        }

        const moduleName = getRuntimeModuleName(state.opts);
        path.replaceWith(
          t.callExpression(
            this.addDefaultImport(
              `${moduleName}/core-js/get-iterator`,
              "getIterator",
            ),
            [callee.object],
          ),
        );
      },

      // Symbol.iterator in arr -> core.$for.isIterable(arr)
      BinaryExpression(path, state) {
        if (state.opts.polyfill === false || state.opts.useBuiltIns) return;

        if (path.node.operator !== "in") return;
        if (!path.get("left").matchesPattern("Symbol.iterator")) return;

        const moduleName = getRuntimeModuleName(state.opts);
        path.replaceWith(
          t.callExpression(
            this.addDefaultImport(
              `${moduleName}/core-js/is-iterable`,
              "isIterable",
            ),
            [path.node.right],
          ),
        );
      },

      // Array.from -> _core.Array.from
      MemberExpression: {
        enter(path, state) {
          if (state.opts.polyfill === false || state.opts.useBuiltIns) return;
          if (!path.isReferenced()) return;

          const { node } = path;
          const obj = node.object;
          const prop = node.property;

          if (!t.isReferenced(obj, node)) return;
          if (node.computed) return;
          if (!has(definitions.methods, obj.name)) return;

          const methods = definitions.methods[obj.name];
          if (!has(methods, prop.name)) return;

          // doesn't reference the global
          if (path.scope.getBindingIdentifier(obj.name)) return;

          // special case Object.defineProperty to not use core-js when using string keys
          if (
            obj.name === "Object" &&
            prop.name === "defineProperty" &&
            path.parentPath.isCallExpression()
          ) {
            const call = path.parentPath.node;
            if (call.arguments.length === 3 && t.isLiteral(call.arguments[1])) {
              return;
            }
          }

          const moduleName = getRuntimeModuleName(state.opts);
          path.replaceWith(
            this.addDefaultImport(
              `${moduleName}/core-js/${methods[prop.name]}`,
              `${obj.name}$${prop.name}`,
            ),
          );
        },

        exit(path, state) {
          if (state.opts.polyfill === false || state.opts.useBuiltIns) return;
          if (!path.isReferenced()) return;

          const { node } = path;
          const obj = node.object;

          if (!has(definitions.builtins, obj.name)) return;
          if (path.scope.getBindingIdentifier(obj.name)) return;

          const moduleName = getRuntimeModuleName(state.opts);
          path.replaceWith(
            t.memberExpression(
              this.addDefaultImport(
                `${moduleName}/core-js/${definitions.builtins[obj.name]}`,
                obj.name,
              ),
              node.property,
              node.computed,
            ),
          );
        },
      },
    },
  };
}

export { definitions };
