// TODO(Babel 8): Remove at least support for babel-plugin-polyfill-regenerator,
// which isn't needed anymore, and babel-plugin-polyfill-corejs2, since core-js
// 2 isn't maintained anymore.
// Consider also removing babel-plugin-polyfill-corejs3 from here, and ask users
// to explicitly enable it in their Babel configuration files.

import type { PluginAPI, PluginObject } from "@babel/core";
import _pluginCorejs2 from "babel-plugin-polyfill-corejs2";
import _pluginCorejs3 from "babel-plugin-polyfill-corejs3";
import _pluginRegenerator from "babel-plugin-polyfill-regenerator";
const pluginCorejs2 = (_pluginCorejs2.default ||
  _pluginCorejs2) as typeof _pluginCorejs2.default;
const pluginCorejs3 = (_pluginCorejs3.default ||
  _pluginCorejs3) as typeof _pluginCorejs3.default;
const pluginRegenerator = (_pluginRegenerator.default ||
  _pluginRegenerator) as typeof _pluginRegenerator.default;

import type { Options } from "./index";

const pluginsCompat = "#__secret_key__@babel/runtime__compatibility";

interface CoreJS2PluginOptions {
  absoluteImports: boolean;
  method: "usage-pure";
  [pluginsCompat]: {
    runtimeVersion: string;
    useBabelRuntime: boolean;
    ext: string;
  };
}

interface RegeneratorPluginOptions {
  absoluteImports: boolean;
  method: "usage-pure";
  [pluginsCompat]: {
    useBabelRuntime: boolean;
  };
}

interface CoreJS3PluginOptions {
  absoluteImports: boolean;
  method: "usage-pure";
  proposals: boolean;
  version: number;
  [pluginsCompat]: {
    useBabelRuntime: boolean;
    ext: string;
  };
}

function createCorejsPlugin<Options extends {}>(
  plugin: (api: PluginAPI, options: Options, filename: string) => PluginObject,
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

function createRegeneratorPlugin(
  options: RegeneratorPluginOptions,
  useRuntimeRegenerator: boolean,
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

export function createBasePolyfillsPlugin(
  { corejs, regenerator: useRuntimeRegenerator = true }: Options,
  runtimeVersion: string,
  absoluteImports: boolean,
) {
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

  const polyfillOpts = {
    method: "usage-pure",
    absoluteImports,
    [pluginsCompat]: { useBabelRuntime: true, runtimeVersion, ext: "" },
  } as const;

  return corejsVersion === 2
    ? createCorejsPlugin<CoreJS2PluginOptions>(
        pluginCorejs2,
        polyfillOpts,
        createRegeneratorPlugin(polyfillOpts, useRuntimeRegenerator),
      )
    : corejsVersion === 3
    ? createCorejsPlugin<CoreJS3PluginOptions>(
        pluginCorejs3,
        { version: 3, proposals, ...polyfillOpts },
        createRegeneratorPlugin(polyfillOpts, useRuntimeRegenerator),
      )
    : createRegeneratorPlugin(polyfillOpts, useRuntimeRegenerator);
}
