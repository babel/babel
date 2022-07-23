import { declare } from "@babel/helper-plugin-utils";
import { addDefault, isModule } from "@babel/helper-module-imports";
import { types as t } from "@babel/core";

import { hasMinVersion } from "./helpers";
import getRuntimePath, { resolveFSPath } from "./get-runtime-path";
import type { PluginAPI, PluginObject, CallerMetadata } from "@babel/core";

import _pluginCorejs2 from "babel-plugin-polyfill-corejs2";
import _pluginCorejs3 from "babel-plugin-polyfill-corejs3";
import _pluginRegenerator from "babel-plugin-polyfill-regenerator";
const pluginCorejs2 = (_pluginCorejs2.default ||
  _pluginCorejs2) as typeof _pluginCorejs2.default;
const pluginCorejs3 = (_pluginCorejs3.default ||
  _pluginCorejs3) as typeof _pluginCorejs3.default;
const pluginRegenerator = (_pluginRegenerator.default ||
  _pluginRegenerator) as typeof _pluginRegenerator.default;

const pluginsCompat = "#__secret_key__@babel/runtime__compatibility";

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

interface CoreJS2PluginOptions {
  absoluteImports: string | false;
  method: "usage-pure";
  [pluginsCompat]: {
    runtimeVersion: string;
    useBabelRuntime: string | false;
    ext: string;
  };
}

interface RegeneratorPluginOptions {
  absoluteImports: string | false;
  method: "usage-pure";
  [pluginsCompat]: {
    useBabelRuntime: string | false;
  };
}

interface CoreJS3PluginOptions {
  absoluteImports: string | false;
  method: "usage-pure";
  proposals: boolean;
  version: number;
  [pluginsCompat]: {
    useBabelRuntime: string | false;
    ext: string;
  };
}

export default declare((api, options: Options, dirname) => {
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

  if (![false, 2, 3].includes(corejsVersion)) {
    throw new Error(
      `The \`core-js\` version must be false, 2 or 3, but got ${JSON.stringify(
        rawVersion,
      )}.`,
    );
  }

  if (proposals && (!corejsVersion || corejsVersion < 3)) {
    throw new Error(
      "The 'proposals' option is only supported when using 'corejs: 3'",
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

  const injectCoreJS2 = corejsVersion === 2;
  const injectCoreJS3 = corejsVersion === 3;

  const moduleName = injectCoreJS3
    ? "@babel/runtime-corejs3"
    : injectCoreJS2
    ? "@babel/runtime-corejs2"
    : "@babel/runtime";

  const HEADER_HELPERS = ["interopRequireWildcard", "interopRequireDefault"];

  const modulePath = getRuntimePath(moduleName, dirname, absoluteRuntime);

  function createCorejsPlugin<Options extends {}>(
    plugin: (
      api: PluginAPI,
      options: Options,
      filename: string,
    ) => PluginObject,
    options: Options,
    regeneratorPlugin: (
      api: PluginAPI,
      options: RegeneratorPluginOptions,
      filename: string,
    ) => PluginObject,
  ): (api: PluginAPI, options: {}, filename: string) => PluginObject {
    return (api: PluginAPI, _: {}, filename: string) => {
      return {
        ...plugin(api, options, filename),
        inherits: regeneratorPlugin,
      };
    };
  }

  // TODO: Remove this in Babel 8
  function createRegeneratorPlugin(
    options: RegeneratorPluginOptions,
  ): (
    api: PluginAPI,
    options: RegeneratorPluginOptions,
    filename: string,
  ) => PluginObject {
    if (!useRuntimeRegenerator) return undefined;
    return (api, _, filename) => {
      return pluginRegenerator(api, options, filename);
    };
  }

  return {
    name: "transform-runtime",

    inherits: injectCoreJS2
      ? createCorejsPlugin<CoreJS2PluginOptions>(
          pluginCorejs2,
          {
            method: "usage-pure",
            absoluteImports: absoluteRuntime ? modulePath : false,
            [pluginsCompat]: {
              runtimeVersion,
              useBabelRuntime: modulePath,
              ext: "",
            },
          },
          createRegeneratorPlugin({
            method: "usage-pure",
            absoluteImports: absoluteRuntime ? modulePath : false,
            [pluginsCompat]: { useBabelRuntime: modulePath },
          }),
        )
      : injectCoreJS3
      ? createCorejsPlugin<CoreJS3PluginOptions>(
          pluginCorejs3,
          {
            method: "usage-pure",
            version: 3,
            proposals,
            absoluteImports: absoluteRuntime ? modulePath : false,
            [pluginsCompat]: { useBabelRuntime: modulePath, ext: "" },
          },
          createRegeneratorPlugin({
            method: "usage-pure",
            absoluteImports: absoluteRuntime ? modulePath : false,
            [pluginsCompat]: { useBabelRuntime: modulePath },
          }),
        )
      : createRegeneratorPlugin({
          method: "usage-pure",
          absoluteImports: absoluteRuntime ? modulePath : false,
          [pluginsCompat]: { useBabelRuntime: modulePath },
        }),

    pre(file) {
      if (!useRuntimeHelpers) return;

      file.set("helperGenerator", (name: string) => {
        // If the helper didn't exist yet at the version given, we bail
        // out and let Babel either insert it directly, or throw an error
        // so that plugins can handle that case properly.
        if (!file.availableHelper?.(name, runtimeVersion)) {
          if (name === "regeneratorRuntime") {
            // For regeneratorRuntime, we can fallback to the old behavior of
            // relying on the regeneratorRuntime global. If the 'regenerator'
            // option is not disabled, babel-plugin-polyfill-regenerator will
            // then replace it with a @babel/helpers/regeneratorRuntime import.
            //
            // We must wrap it in a function, because built-in Babel helpers
            // are functions.
            //
            // TODO: Remove this in Babel 8.
            return t.arrowFunctionExpression(
              [],
              t.identifier("regeneratorRuntime"),
            );
          }
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
