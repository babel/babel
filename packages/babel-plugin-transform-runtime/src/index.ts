import { declare } from "@babel/helper-plugin-utils";
import { addDefault, isModule } from "@babel/helper-module-imports";
import { types as t } from "@babel/core";

import getRuntimePath, { resolveFSPath } from "./get-runtime-path/index.ts";

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
    version: runtimeVersion = "8.0.0-beta.0",
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

  if (Object.hasOwn(options, "useBuiltIns")) {
    // @ts-expect-error deprecated options
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

  if (Object.hasOwn(options, "polyfill")) {
    // @ts-expect-error deprecated options
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

  if (Object.hasOwn(options, "regenerator")) {
    throw new Error(
      "The 'regenerator' option has been removed. The generators transform " +
        "no longers relies on a 'regeneratorRuntime' global. " +
        "If you still need to replace imports to the 'regeneratorRuntime' " +
        "global, you can use babel-plugin-polyfill-regenerator.",
    );
  }

  if (Object.hasOwn(options, "useESModules")) {
    throw new Error(
      "The 'useESModules' option has been removed. @babel/runtime now uses " +
        "package.json#exports to support both CommonJS and ESM helpers.",
    );
  }

  if (Object.hasOwn(options, "helpers")) {
    throw new Error(
      "The 'helpers' option has been removed. " +
        "Remove the plugin from your config if " +
        "you want to disable helpers import injection.",
    );
  }

  const HEADER_HELPERS = new Set([
    "interopRequireWildcard",
    "interopRequireDefault",
  ]);

  return {
    name: "transform-runtime",

    inherits: undefined,
    pre(file) {
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

        if (!file.availableHelper(name, runtimeVersion)) return;

        // Explicitly set the CommonJS interop helpers to their reserve
        // blockHoist of 4 so they are guaranteed to exist
        // when other things used them to import.
        const blockHoist =
          HEADER_HELPERS.has(name) && !isModule(file.path) ? 4 : undefined;

        let helperPath = `${modulePath}/helpers/${name}`;
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
            importedInterop: isHelper ? "compiled" : "uncompiled",
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
