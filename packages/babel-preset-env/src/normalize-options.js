//@flow

import invariant from "invariant";
import browserslist from "browserslist";
import builtInsList from "../data/built-ins.json";
import { defaultWebIncludes } from "./default-includes";
import moduleTransformations from "./module-transformations";
import pluginsList from "../data/plugins.json";
import type { Targets, Options, ModuleOption, BuiltInsOption } from "./types";

const validIncludesAndExcludes = new Set([
  ...Object.keys(pluginsList),
  ...Object.keys(moduleTransformations).map(m => moduleTransformations[m]),
  ...Object.keys(builtInsList),
  ...defaultWebIncludes,
]);

const pluginToRegExp = (plugin: any): RegExp => {
  if (plugin instanceof RegExp) return plugin;
  try {
    return new RegExp(`^${normalizePluginName(plugin)}$`);
  } catch (e) {
    return null;
  }
};

const selectPlugins = (regexp: RegExp): Array<string> =>
  Array.from(validIncludesAndExcludes).filter(
    item => regexp instanceof RegExp && regexp.test(item),
  );

const flatten = array => [].concat(...array);

const expandIncludesAndExcludes = (
  plugins: Array<string | RegExp> = [],
  type: string,
): Array<string> => {
  if (plugins.length === 0) return plugins;

  const selectedPlugins = plugins.map(plugin =>
    selectPlugins(pluginToRegExp(plugin)),
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

  return flatten(selectedPlugins);
};

const validBrowserslistTargets = [
  ...Object.keys(browserslist.data),
  ...Object.keys(browserslist.aliases),
];

export const normalizePluginName = (plugin: string): string =>
  plugin.replace(/^babel-plugin-/, "");

export const checkDuplicateIncludeExcludes = (
  include: Array<string> = [],
  exclude: Array<string> = [],
): void => {
  const duplicates: Array<string> = include.filter(
    opt => exclude.indexOf(opt) >= 0,
  );

  invariant(
    duplicates.length === 0,
    `Invalid Option: The plugins/built-ins '${duplicates.join(
      ", ",
    )}' were found in both the "include" and
    "exclude" options.`,
  );
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
  value: ?boolean,
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
    "ignoreBrowserslistConfig",
    ignoreBrowserslistConfig,
    false,
  );

export const validateModulesOption = (
  modulesOpt: ModuleOption = "commonjs",
) => {
  invariant(
    modulesOpt === false ||
      Object.keys(moduleTransformations).indexOf(modulesOpt) > -1,
    `Invalid Option: The 'modules' option must be either 'false' to indicate no modules, or a
    module type which can be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'.`,
  );

  return modulesOpt;
};

export const objectToBrowserslist = (object: Targets) => {
  return Object.keys(object).reduce((list, targetName) => {
    if (validBrowserslistTargets.indexOf(targetName) >= 0) {
      const targetVersion = object[targetName];
      return list.concat(`${targetName} ${targetVersion}`);
    }
    return list;
  }, []);
};

export const validateUseBuiltInsOption = (
  builtInsOpt: BuiltInsOption = false,
): BuiltInsOption => {
  invariant(
    builtInsOpt === "usage" || builtInsOpt === false || builtInsOpt === "entry",
    `Invalid Option: The 'useBuiltIns' option must be either
    'false' (default) to indicate no polyfill,
    '"entry"' to indicate replacing the entry polyfill, or
    '"usage"' to import only used polyfills per file`,
  );

  return builtInsOpt;
};

export default function normalizeOptions(opts: Options) {
  const include = expandIncludesAndExcludes(opts.include, "include");
  const exclude = expandIncludesAndExcludes(opts.exclude, "exclude");

  checkDuplicateIncludeExcludes(include, exclude);

  return {
    configPath: validateConfigPathOption(opts.configPath),
    debug: opts.debug,
    include,
    exclude,
    forceAllTransforms: validateBoolOption(
      "forceAllTransforms",
      opts.forceAllTransforms,
      false,
    ),
    ignoreBrowserslistConfig: validateIgnoreBrowserslistConfig(
      opts.ignoreBrowserslistConfig,
    ),
    loose: validateBoolOption("loose", opts.loose, false),
    modules: validateModulesOption(opts.modules),
    shippedProposals: validateBoolOption(
      "shippedProposals",
      opts.shippedProposals,
      false,
    ),
    spec: validateBoolOption("loose", opts.spec, false),
    targets: Object.assign({}, opts.targets),
    useBuiltIns: validateUseBuiltInsOption(opts.useBuiltIns),
  };
}
