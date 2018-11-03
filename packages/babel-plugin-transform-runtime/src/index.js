import path from "path";
import resolve from "resolve";
import { declare } from "@babel/helper-plugin-utils";
import { addDefault, isModule } from "@babel/helper-module-imports";
import { types as t } from "@babel/core";

import getDefinitions from "./definitions";

function resolveAbsoluteRuntime(moduleName: string, dirname: string) {
  try {
    return path.dirname(
      resolve.sync(`${moduleName}/package.json`, { basedir: dirname }),
    );
  } catch (err) {
    if (err.code !== "MODULE_NOT_FOUND") throw err;

    throw Object.assign(
      new Error(`Failed to resolve "${moduleName}" relative to "${dirname}"`),
      {
        code: "BABEL_RUNTIME_NOT_FOUND",
        runtime: moduleName,
        dirname,
      },
    );
  }
}

function supportsStaticESM(caller) {
  return !!(caller && caller.supportsStaticESM);
}

export default declare((api, options, dirname) => {
  api.assertVersion(7);

  const {
    corejs: corejsVersion = false,
    helpers: useRuntimeHelpers = true,
    regenerator: useRuntimeRegenerator = true,
    useESModules = false,
    version: runtimeVersion = "7.0.0-beta.0",
    absoluteRuntime = false,
  } = options;

  const definitions = getDefinitions(runtimeVersion);

  if (typeof useRuntimeRegenerator !== "boolean") {
    throw new Error(
      "The 'regenerator' option must be undefined, or a boolean.",
    );
  }
  if (typeof useRuntimeHelpers !== "boolean") {
    throw new Error("The 'helpers' option must be undefined, or a boolean.");
  }
  if (typeof useESModules !== "boolean" && useESModules !== "auto") {
    throw new Error(
      "The 'useESModules' option must be undefined, or a boolean, or 'auto'.",
    );
  }
  if (
    typeof absoluteRuntime !== "boolean" &&
    typeof absoluteRuntime !== "string"
  ) {
    throw new Error(
      "The 'absoluteRuntime' option must be undefined, a boolean, or a string.",
    );
  }
  if (
    corejsVersion !== false &&
    (typeof corejsVersion !== "number" || corejsVersion !== 2) &&
    (typeof corejsVersion !== "string" || corejsVersion !== "2")
  ) {
    throw new Error(
      `The 'corejs' option must be undefined, false, 2 or '2', ` +
        `but got ${JSON.stringify(corejsVersion)}.`,
    );
  }
  if (typeof runtimeVersion !== "string") {
    throw new Error(`The 'version' option must be a version string.`);
  }

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  if (has(options, "useBuiltIns")) {
    if (options.useBuiltIns) {
      throw new Error(
        "The 'useBuiltIns' option has been removed. The @babel/runtime " +
          "module now uses builtins by default.",
      );
    } else {
      throw new Error(
        "The 'useBuiltIns' option has been removed. Use the 'corejs'" +
          "option with value '2' to polyfill with CoreJS 2.x via @babel/runtime.",
      );
    }
  }
  if (has(options, "polyfill")) {
    if (options.polyfill === false) {
      throw new Error(
        "The 'polyfill' option has been removed. The @babel/runtime " +
          "module now skips polyfilling by default.",
      );
    } else {
      throw new Error(
        "The 'polyfill' option has been removed. Use the 'corejs'" +
          "option with value '2' to polyfill with CoreJS 2.x via @babel/runtime.",
      );
    }
  }
  if (has(options, "moduleName")) {
    throw new Error(
      "The 'moduleName' option has been removed. @babel/transform-runtime " +
        "no longer supports arbitrary runtimes. If you were using this to " +
        "set an absolute path for Babel's standard runtimes, please use the " +
        "'absoluteRuntime' option.",
    );
  }

  const esModules =
    useESModules === "auto" ? api.caller(supportsStaticESM) : useESModules;

  const injectCoreJS2 = `${corejsVersion}` === "2";
  const moduleName = injectCoreJS2
    ? "@babel/runtime-corejs2"
    : "@babel/runtime";

  const HEADER_HELPERS = ["interopRequireWildcard", "interopRequireDefault"];

  let modulePath = moduleName;
  if (absoluteRuntime !== false) {
    modulePath = resolveAbsoluteRuntime(
      moduleName,
      path.resolve(dirname, absoluteRuntime === true ? "." : absoluteRuntime),
    );
  }

  return {
    pre(file) {
      if (useRuntimeHelpers) {
        file.set("helperGenerator", name => {
          // If the helper didn't exist yet at the version given, we bail
          // out and let Babel either insert it directly, or throw an error
          // so that plugins can handle that case properly.
          if (
            file.availableHelper &&
            !file.availableHelper(name, runtimeVersion)
          ) {
            return;
          }

          const isInteropHelper = HEADER_HELPERS.indexOf(name) !== -1;

          // Explicitly set the CommonJS interop helpers to their reserve
          // blockHoist of 4 so they are guaranteed to exist
          // when other things used them to import.
          const blockHoist =
            isInteropHelper && !isModule(file.path) ? 4 : undefined;

          const helpersDir =
            esModules && file.path.node.sourceType === "module"
              ? "helpers/esm"
              : "helpers";

          return this.addDefaultImport(
            `${modulePath}/${helpersDir}/${name}`,
            name,
            blockHoist,
          );
        });
      }

      const cache = new Map();

      this.addDefaultImport = (source, nameHint, blockHoist) => {
        // If something on the page adds a helper when the file is an ES6
        // file, we can't reused the cached helper name after things have been
        // transformed because it has almost certainly been renamed.
        const cacheKey = isModule(file.path);
        const key = `${source}:${nameHint}:${cacheKey || ""}`;

        let cached = cache.get(key);
        if (cached) {
          cached = t.cloneNode(cached);
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
      ReferencedIdentifier(path) {
        const { node, parent, scope } = path;
        if (node.name === "regeneratorRuntime" && useRuntimeRegenerator) {
          path.replaceWith(
            this.addDefaultImport(
              `${modulePath}/regenerator`,
              "regeneratorRuntime",
            ),
          );
          return;
        }

        if (!injectCoreJS2) return;

        if (t.isMemberExpression(parent)) return;
        if (!has(definitions.builtins, node.name)) return;
        if (scope.getBindingIdentifier(node.name)) return;

        // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
        path.replaceWith(
          this.addDefaultImport(
            `${modulePath}/core-js/${definitions.builtins[node.name]}`,
            node.name,
          ),
        );
      },

      // arr[Symbol.iterator]() -> _core.$for.getIterator(arr)
      CallExpression(path) {
        if (!injectCoreJS2) return;

        // we can't compile this
        if (path.node.arguments.length) return;

        const callee = path.node.callee;
        if (!t.isMemberExpression(callee)) return;
        if (!callee.computed) return;
        if (!path.get("callee.property").matchesPattern("Symbol.iterator")) {
          return;
        }

        path.replaceWith(
          t.callExpression(
            this.addDefaultImport(
              `${modulePath}/core-js/get-iterator`,
              "getIterator",
            ),
            [callee.object],
          ),
        );
      },

      // Symbol.iterator in arr -> core.$for.isIterable(arr)
      BinaryExpression(path) {
        if (!injectCoreJS2) return;

        if (path.node.operator !== "in") return;
        if (!path.get("left").matchesPattern("Symbol.iterator")) return;

        path.replaceWith(
          t.callExpression(
            this.addDefaultImport(
              `${modulePath}/core-js/is-iterable`,
              "isIterable",
            ),
            [path.node.right],
          ),
        );
      },

      // Array.from -> _core.Array.from
      MemberExpression: {
        enter(path) {
          if (!injectCoreJS2) return;
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

          path.replaceWith(
            this.addDefaultImport(
              `${modulePath}/core-js/${methods[prop.name]}`,
              `${obj.name}$${prop.name}`,
            ),
          );
        },

        exit(path) {
          if (!injectCoreJS2) return;
          if (!path.isReferenced()) return;

          const { node } = path;
          const obj = node.object;

          if (!has(definitions.builtins, obj.name)) return;
          if (path.scope.getBindingIdentifier(obj.name)) return;

          path.replaceWith(
            t.memberExpression(
              this.addDefaultImport(
                `${modulePath}/core-js/${definitions.builtins[obj.name]}`,
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
});
