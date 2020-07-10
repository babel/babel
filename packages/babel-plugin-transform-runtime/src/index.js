import { declare } from "@babel/helper-plugin-utils";
import { addDefault, isModule } from "@babel/helper-module-imports";
import { types as t } from "@babel/core";
import pluginPolyfillCoreJS3 from "babel-plugin-polyfill-corejs3";

import getRuntimePath from "./get-runtime-path";

function supportsStaticESM(caller) {
  return !!caller?.supportsStaticESM;
}

export default declare((api, options, dirname) => {
  api.assertVersion(7);

  const {
    corejs,
    helpers: useRuntimeHelpers = true,
    regenerator: useRuntimeRegenerator = true,
    useESModules = false,
    version: runtimeVersion = "7.0.0-beta.0",
    absoluteRuntime = false,
  } = options;

  let proposals = false;
  let rawVersion;

  if (typeof corejs === "object" && corejs !== null) {
    rawVersion = corejs.version;
    proposals = Boolean(corejs.proposals);
  } else {
    rawVersion = corejs;
  }

  const corejsVersion = rawVersion ? Number(rawVersion) : false;

  if (corejsVersion === 2) {
    throw new Error(
      `Since Babel 8, the core-js 2 support has been dropped. Please use 'corejs: 3'.
- If you really want to use obsolete core-js@2, please install \`babel-plugin-polyfill-corejs2\` and add to the "plugins" config
  npm install --save-dev babel-plugin-polyfill-corejs2
  yarn add --dev babel-plugin-polyfill-corejs2`,
    );
  }

  if (![false, 3].includes(corejsVersion)) {
    throw new Error(
      `The \`core-js\` version must be false or 3, but got ${JSON.stringify(
        rawVersion,
      )}.`,
    );
  }

  if (proposals && !corejsVersion) {
    throw new Error(
      "The 'proposals' option is only supported when using core-js",
    );
  }

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
          "option to polyfill with `core-js` via @babel/runtime.",
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
          "option to polyfill with `core-js` via @babel/runtime.",
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

  const injectCoreJS = corejsVersion !== false;

  const moduleName = injectCoreJS ? "@babel/runtime-corejs3" : "@babel/runtime";

  const HEADER_HELPERS = ["interopRequireWildcard", "interopRequireDefault"];

  const modulePath = getRuntimePath(moduleName, dirname, absoluteRuntime);

  return {
    name: "transform-runtime",

    inherits:
      corejsVersion === false
        ? undefined
        : function runtimeInjectCoreJS3(babel, options, dirname) {
            return pluginPolyfillCoreJS3(
              babel,
              {
                proposals,
                method: "usage-pure",
                missingDependencies: { log: "per-file" },
              },
              dirname,
            );
          },

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
      // transform `regeneratorRuntime`
      ReferencedIdentifier(path) {
        if (!useRuntimeRegenerator) return;
        if (path.node.name !== "regeneratorRuntime") return;

        path.replaceWith(
          this.addDefaultImport(
            `${modulePath}/regenerator`,
            "regeneratorRuntime",
          ),
        );
      },
    },
  };
});
