import { declare } from "@babel/helper-plugin-utils";
import { addDefault, isModule } from "@babel/helper-module-imports";
import { types as t } from "@babel/core";

import { hasMinVersion } from "./helpers.ts";
import getRuntimePath, { resolveFSPath } from "./get-runtime-path/index.ts";

// TODO(Babel 8): Remove this
import babel7 from "./babel-7/index.cjs" with { if: "!process.env.BABEL_8_BREAKING" };

export interface Options {
  absoluteRuntime?: boolean;
  corejs?: string | number | { version: string | number; proposals?: boolean };
  helpers?: boolean;
  version?: string;
  moduleName?: null | string;
}

export default declare((api, options: Options, dirname) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const {
    version: runtimeVersion = "7.0.0-beta.0",
    absoluteRuntime = false,
    moduleName = null,
  } = options;

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

  if (moduleName !== null && typeof moduleName !== "string") {
    throw new Error("The 'moduleName' option must be null or a string.");
  }

  if (!process.env.BABEL_8_BREAKING) {
    // In recent @babel/runtime versions, we can use require("helper").default
    // instead of require("helper") so that it has the same interface as the
    // ESM helper, and bundlers can better exchange one format for the other.
    const DUAL_MODE_RUNTIME = "7.13.0";
    // eslint-disable-next-line no-var
    var supportsCJSDefault = hasMinVersion(DUAL_MODE_RUNTIME, runtimeVersion);
  }

  if (Object.hasOwn(options, "useBuiltIns")) {
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

  if (Object.hasOwn(options, "polyfill")) {
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

  if (process.env.BABEL_8_BREAKING) {
    if (Object.hasOwn(options, "regenerator")) {
      throw new Error(
        "The 'regenerator' option has been removed. The generators transform " +
          "no longers relies on a 'regeneratorRuntime' global. " +
          "If you still need to replace imports to the 'regeneratorRuntime' " +
          "global, you can use babel-plugin-polyfill-regenerator.",
      );
    }
  }

  if (process.env.BABEL_8_BREAKING) {
    if (Object.hasOwn(options, "useESModules")) {
      throw new Error(
        "The 'useESModules' option has been removed. @babel/runtime now uses " +
          "package.json#exports to support both CommonJS and ESM helpers.",
      );
    }
  } else {
    // @ts-expect-error(Babel 7 vs Babel 8)
    const { useESModules = false } = options;
    if (typeof useESModules !== "boolean" && useESModules !== "auto") {
      throw new Error(
        "The 'useESModules' option must be undefined, or a boolean, or 'auto'.",
      );
    }

    // eslint-disable-next-line no-var
    var esModules =
      useESModules === "auto"
        ? api.caller(
            // @ts-expect-error CallerMetadata does not define supportsStaticESM
            caller => !!caller?.supportsStaticESM,
          )
        : useESModules;
  }

  if (process.env.BABEL_8_BREAKING) {
    if (Object.hasOwn(options, "helpers")) {
      throw new Error(
        "The 'helpers' option has been removed. " +
          "Remove the plugin from your config if " +
          "you want to disable helpers import injection.",
      );
    }
  } else {
    // eslint-disable-next-line no-var
    var { helpers: useRuntimeHelpers = true } = options;

    if (typeof useRuntimeHelpers !== "boolean") {
      throw new Error("The 'helpers' option must be undefined, or a boolean.");
    }
  }

  const HEADER_HELPERS = new Set([
    "interopRequireWildcard",
    "interopRequireDefault",
  ]);

  return {
    name: "transform-runtime",

    inherits: process.env.BABEL_8_BREAKING
      ? undefined
      : babel7.createPolyfillPlugins(options, runtimeVersion, absoluteRuntime),

    pre(file) {
      if (!process.env.BABEL_8_BREAKING && !useRuntimeHelpers) return;

      let modulePath: string;

      file.set("helperGenerator", (name: string) => {
        modulePath ??= getRuntimePath(
          moduleName ??
            file.get("runtimeHelpersModuleName") ??
            "@babel/runtime",
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

        // Explicitly set the CommonJS interop helpers to their reserve
        // blockHoist of 4 so they are guaranteed to exist
        // when other things used them to import.
        const blockHoist =
          HEADER_HELPERS.has(name) && !isModule(file.path) ? 4 : undefined;

        let helperPath = `${modulePath}/helpers/${
          !process.env.BABEL_8_BREAKING &&
          esModules &&
          file.path.node.sourceType === "module"
            ? "esm/" + name
            : name
        }`;
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
