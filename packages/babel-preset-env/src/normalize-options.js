// @flow
import corejs3Polyfills from "core-js-compat/data";
import invariant from "invariant";
import { coerce, SemVer } from "semver";
import corejs2Polyfills from "../data/corejs2-built-ins.json";
import pluginsList from "../data/plugins.json";
import moduleTransformations from "./module-transformations";
import { TopLevelOptions, ModulesOption, UseBuiltInsOption } from "./options";
import { defaultWebIncludes } from "./polyfills/corejs2/get-platform-specific-default";
import { isBrowsersQueryValid } from "./targets-parser";
import { findSuggestion } from "./utils";

import type {
  BuiltInsOption,
  CorejsOption,
  ModuleOption,
  Options,
  PluginListItem,
  PluginListOption,
} from "./types";

const validateTopLevelOptions = (options: Options) => {
  const validOptions = Object.keys(TopLevelOptions);

  for (const option in options) {
    if (!TopLevelOptions[option]) {
      throw new Error(
        `Invalid Option: ${option} is not a valid top-level option.
        Maybe you meant to use '${findSuggestion(validOptions, option)}'?`,
      );
    }
  }
};

const allPluginsList = [
  ...Object.keys(pluginsList),
  ...Object.keys(moduleTransformations).map(m => moduleTransformations[m]),
];

const validIncludesAndExcludesWithoutCoreJS = new Set(allPluginsList);

const validIncludesAndExcludesWithCoreJS2 = new Set([
  ...allPluginsList,
  ...Object.keys(corejs2Polyfills),
  ...defaultWebIncludes,
]);

const validIncludesAndExcludesWithCoreJS3 = new Set([
  ...allPluginsList,
  ...Object.keys(corejs3Polyfills),
]);

const pluginToRegExp = (plugin: PluginListItem) => {
  if (plugin instanceof RegExp) return plugin;
  try {
    return new RegExp(`^${normalizePluginName(plugin)}$`);
  } catch (e) {
    return null;
  }
};

const selectPlugins = (regexp: RegExp | null, corejs: number | false) =>
  Array.from(
    corejs
      ? corejs == 2
        ? validIncludesAndExcludesWithCoreJS2
        : validIncludesAndExcludesWithCoreJS3
      : validIncludesAndExcludesWithoutCoreJS,
  ).filter(item => regexp instanceof RegExp && regexp.test(item));

const flatten = <T>(array: Array<Array<T>>): Array<T> => [].concat(...array);

const expandIncludesAndExcludes = (
  plugins: PluginListOption = [],
  type: "include" | "exclude",
  corejs: number | false,
) => {
  if (plugins.length === 0) return [];

  const selectedPlugins = plugins.map(plugin =>
    selectPlugins(pluginToRegExp(plugin), corejs),
  );
  const invalidRegExpList = plugins.filter(
    (p, i) => selectedPlugins[i].length === 0,
  );

  invariant(
    invalidRegExpList.length === 0,
    `Invalid Option: The plugins/built-ins '${invalidRegExpList.join(
      ", ",
    )}' passed to the '${type}' option are not
    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env`,
  );

  return flatten<string>(selectedPlugins);
};

export const normalizePluginName = (plugin: string) =>
  plugin.replace(/^(@babel\/|babel-)(plugin-)?/, "");

export const checkDuplicateIncludeExcludes = (
  include: Array<string> = [],
  exclude: Array<string> = [],
) => {
  const duplicates = include.filter(opt => exclude.indexOf(opt) >= 0);

  invariant(
    duplicates.length === 0,
    `Invalid Option: The plugins/built-ins '${duplicates.join(
      ", ",
    )}' were found in both the "include" and
    "exclude" options.`,
  );
};

const normalizeTargets = targets => {
  // TODO: Allow to use only query or strings as a targets from next breaking change.
  if (isBrowsersQueryValid(targets)) {
    return { browsers: targets };
  }
  return {
    ...targets,
  };
};

export const validateConfigPathOption = (
  configPath: string = process.cwd(),
) => {
  invariant(
    typeof configPath === "string",
    `Invalid Option: The configPath option '${configPath}' is invalid, only strings are allowed.`,
  );
  return configPath;
};

export const validateBoolOption = (
  name: string,
  value?: boolean,
  defaultValue: boolean,
) => {
  if (typeof value === "undefined") {
    value = defaultValue;
  }

  if (typeof value !== "boolean") {
    throw new Error(`Preset env: '${name}' option must be a boolean.`);
  }

  return value;
};

export const validateIgnoreBrowserslistConfig = (
  ignoreBrowserslistConfig: boolean,
) =>
  validateBoolOption(
    TopLevelOptions.ignoreBrowserslistConfig,
    ignoreBrowserslistConfig,
    false,
  );

export const validateModulesOption = (
  modulesOpt: ModuleOption = ModulesOption.auto,
) => {
  invariant(
    ModulesOption[modulesOpt.toString()] ||
      ModulesOption[modulesOpt.toString()] === ModulesOption.false,
    `Invalid Option: The 'modules' option must be one of \n` +
      ` - 'false' to indicate no module processing\n` +
      ` - a specific module type: 'commonjs', 'amd', 'umd', 'systemjs'` +
      ` - 'auto' (default) which will automatically select 'false' if the current\n` +
      `   process is known to support ES module syntax, or "commonjs" otherwise\n`,
  );

  return modulesOpt;
};

export const validateUseBuiltInsOption = (
  builtInsOpt: BuiltInsOption = false,
) => {
  invariant(
    UseBuiltInsOption[builtInsOpt.toString()] ||
      UseBuiltInsOption[builtInsOpt.toString()] === UseBuiltInsOption.false,
    `Invalid Option: The 'useBuiltIns' option must be either
    'false' (default) to indicate no polyfill,
    '"entry"' to indicate replacing the entry polyfill, or
    '"usage"' to import only used polyfills per file`,
  );

  return builtInsOpt;
};

export type NormalizedCorejsOption = {
  proposals: boolean,
  version: typeof SemVer | null | false,
};

export function normalizeCoreJSOption(
  corejs?: CorejsOption,
  useBuiltIns: BuiltInsOption,
): NormalizedCorejsOption {
  let proposals = false;
  let rawVersion;

  if (useBuiltIns && corejs === undefined) {
    rawVersion = 2;
    console.log(
      "\nWe noticed you're using the `useBuiltIns` option without declaring a " +
        "core-js version. Currently, we assume version 2.x when no version " +
        "is passed. Since this default version will likely change in future " +
        "versions of Babel, we recommend explicitly setting the core-js version " +
        "you are using via the `corejs` option.\n",
    );
  } else if (typeof corejs === "object" && corejs !== null) {
    rawVersion = corejs.version;
    proposals = Boolean(corejs.proposals);
  } else {
    rawVersion = corejs;
  }

  const version = rawVersion ? coerce(String(rawVersion)) : false;

  if (!useBuiltIns && version) {
    console.log(
      "\nThe `corejs` option only has an effect when the `useBuiltIns` option is not `false`\n",
    );
  }

  if (useBuiltIns && (!version || version.major < 2 || version.major > 3)) {
    throw new RangeError(
      "Invalid Option: The version passed to `corejs` is invalid. Currently, " +
        "only core-js@2 and core-js@3 are supported.",
    );
  }

  return { version, proposals };
}

export default function normalizeOptions(opts: Options) {
  validateTopLevelOptions(opts);

  const useBuiltIns = validateUseBuiltInsOption(opts.useBuiltIns);

  const corejs = normalizeCoreJSOption(opts.corejs, useBuiltIns);

  const include = expandIncludesAndExcludes(
    opts.include,
    TopLevelOptions.include,
    !!corejs.version && corejs.version.major,
  );

  const exclude = expandIncludesAndExcludes(
    opts.exclude,
    TopLevelOptions.exclude,
    !!corejs.version && corejs.version.major,
  );

  checkDuplicateIncludeExcludes(include, exclude);

  const shippedProposals =
    validateBoolOption(
      TopLevelOptions.shippedProposals,
      opts.shippedProposals,
      false,
    ) || corejs.proposals;

  return {
    configPath: validateConfigPathOption(opts.configPath),
    corejs,
    debug: validateBoolOption(TopLevelOptions.debug, opts.debug, false),
    include,
    exclude,
    forceAllTransforms: validateBoolOption(
      TopLevelOptions.forceAllTransforms,
      opts.forceAllTransforms,
      false,
    ),
    ignoreBrowserslistConfig: validateIgnoreBrowserslistConfig(
      opts.ignoreBrowserslistConfig,
    ),
    loose: validateBoolOption(TopLevelOptions.loose, opts.loose, false),
    modules: validateModulesOption(opts.modules),
    shippedProposals,
    spec: validateBoolOption(TopLevelOptions.spec, opts.spec, false),
    targets: normalizeTargets(opts.targets),
    useBuiltIns: useBuiltIns,
  };
}
