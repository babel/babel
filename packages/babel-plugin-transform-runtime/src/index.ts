import { declare } from "@babel/helper-plugin-utils";
import { addDefault, isModule } from "@babel/helper-module-imports";
import { types as t, type CallerMetadata } from "@babel/core";

import { hasMinVersion } from "./helpers";
import getRuntimePath, { resolveFSPath } from "./get-runtime-path";
import { createBasePolyfillsPlugin } from "./polyfills";

function supportsStaticESM(caller: CallerMetadata | undefined) {
  // @ts-expect-error TS does not narrow down optional chaining
  return !!caller?.supportsStaticESM;
}

export interface Options {
  absoluteRuntime?: boolean;
  corejs?: string | number | { version: string | number; proposals?: boolean };
  helpers?: boolean;
  regenerator?: boolean;
  useESModules?: boolean | "auto";
  version?: string;
}

export default declare((api, options: Options, dirname) => {
  api.assertVersion(7);

  const {
    helpers: useRuntimeHelpers = true,
    useESModules = false,
    version: runtimeVersion = "7.0.0-beta.0",
    absoluteRuntime = false,
  } = options;

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

  if (!process.env.BABEL_8_BREAKING) {
    // In recent @babel/runtime versions, we can use require("helper").default
    // instead of require("helper") so that it has the same interface as the
    // ESM helper, and bundlers can better exchange one format for the other.
    const DUAL_MODE_RUNTIME = "7.13.0";
    // eslint-disable-next-line no-var
    var supportsCJSDefault = hasMinVersion(DUAL_MODE_RUNTIME, runtimeVersion);
  }

  function has(obj: {}, key: string) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  if (has(options, "useBuiltIns")) {
    // @ts-expect-error deprecated options
    if (options["useBuiltIns"]) {
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
    // @ts-expect-error deprecated options
    if (options["polyfill"] === false) {
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

  const HEADER_HELPERS = ["interopRequireWildcard", "interopRequireDefault"];

  return {
    name: "transform-runtime",

    inherits: createBasePolyfillsPlugin(
      options,
      runtimeVersion,
      absoluteRuntime,
    ),

    pre(file) {
      if (!useRuntimeHelpers) return;

      let modulePath: string;

      file.set("helperGenerator", (name: string) => {
        modulePath ??= getRuntimePath(
          file.get("runtimeHelpersModuleName") ?? "@babel/runtime",
          dirname,
          absoluteRuntime,
        );

        // If the helper didn't exist yet at the version given, we bail
        // out and let Babel either insert it directly, or throw an error
        // so that plugins can handle that case properly.
        if (!process.env.BABEL_8_BREAKING) {
          if (!file.availableHelper?.(name, runtimeVersion)) {
            if (name === "regeneratorRuntime") {
              // For regeneratorRuntime, we can fallback to the old behavior of
              // relying on the regeneratorRuntime global. If the 'regenerator'
              // option is not disabled, babel-plugin-polyfill-regenerator will
              // then replace it with a @babel/helpers/regenerator import.
              //
              // We must wrap it in a function, because built-in Babel helpers
              // are functions.
              return t.arrowFunctionExpression(
                [],
                t.identifier("regeneratorRuntime"),
              );
            }
            return;
          }
        } else {
          if (!file.availableHelper(name, runtimeVersion)) return;
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

        let helperPath = `${modulePath}/${helpersDir}/${name}`;
        if (absoluteRuntime) helperPath = resolveFSPath(helperPath);

        return addDefaultImport(helperPath, name, blockHoist, true);
      });

      const cache = new Map();

      function addDefaultImport(
        source: string,
        nameHint: string,
        blockHoist: number,
        isHelper = false,
      ) {
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
            importedInterop: (
              process.env.BABEL_8_BREAKING
                ? isHelper
                : isHelper && supportsCJSDefault
            )
              ? "compiled"
              : "uncompiled",
            nameHint,
            blockHoist,
          });

          cache.set(key, cached);
        }
        return cached;
      }
    },
  };
});
