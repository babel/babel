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

const validRegExp = (regexp: string): boolean => {
  try {
    new RegExp(regexp);
    return true;
  } catch (e) {
    return false;
  }
};

const selectPlugins = (regexp: RegExp): Array<string> =>
  Array.from(validIncludesAndExcludes).filter(item => item.match(regexp));

const pluginToRegExp = (plugin: any): RegExp => {
  return plugin instanceof RegExp
    ? plugin
    : new RegExp(normalizePluginName(plugin));
};

const populatePlugins = (
  pluginList: Array<RegExp>,
  regexp: RegExp,
): Array<string> => pluginList.concat(selectPlugins(regexp));

const isValidPlugin = (plugin: any): boolean =>
  validRegExp(plugin) && selectPlugins(pluginToRegExp(plugin)).length > 0;

const expandIncludesAndExcludes = (
  plugins: Array<string>,
  type: string,
): Array<string> => {
  const invalidRegExp = plugins.filter(plugin => !isValidPlugin(plugin));

  invariant(
    invalidRegExp.length === 0,
    `Invalid RegExp: The given regular expression '${invalidRegExp.join(
      ", ",
    )}' passed to the '${type}' option are not valid.`,
  );

  return plugins.map(pluginToRegExp).reduce(populatePlugins, []);
};

export const validateIncludesAndExcludes = (
  opts: Array<string> = [],
  type: string,
): Array<string> => {
  invariant(
    Array.isArray(opts),
    `Invalid Option: The '${type}' option must be an Array<String> of plugins/built-ins`,
  );

  const unknownOpts = opts.filter(opt => !validIncludesAndExcludes.has(opt));

  invariant(
    unknownOpts.length === 0,
    `Invalid Option: The plugins/built-ins '${unknownOpts.join(
      ", ",
    )}' passed to the '${type}' option are not
    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env`,
  );

  return opts;
};

const validBrowserslistTargets = [
  ...Object.keys(browserslist.data),
  ...Object.keys(browserslist.aliases),
];

const normalizePluginName = (plugin: string): string =>
  plugin.replace(/babel-plugin-/, "");

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
  if (opts.exclude) {
    opts.exclude = expandIncludesAndExcludes(opts.exclude);
  }

  if (opts.include) {
    opts.include = expandIncludesAndExcludes(opts.include);
  }

  checkDuplicateIncludeExcludes(opts.include, opts.exclude);

  return {
    configPath: validateConfigPathOption(opts.configPath),
    debug: opts.debug,
    exclude: validateIncludesAndExcludes(opts.exclude, "exclude"),
    forceAllTransforms: validateBoolOption(
      "forceAllTransforms",
      opts.forceAllTransforms,
      false,
    ),
    ignoreBrowserslistConfig: validateIgnoreBrowserslistConfig(
      opts.ignoreBrowserslistConfig,
    ),
    include: validateIncludesAndExcludes(opts.include, "include"),
    loose: validateBoolOption("loose", opts.loose, false),
    modules: validateModulesOption(opts.modules),
    shippedProposals: validateBoolOption(
      "shippedProposals",
      opts.shippedProposals,
      false,
    ),
    spec: validateBoolOption("loose", opts.spec, false),
    targets: opts.targets,
    useBuiltIns: validateUseBuiltInsOption(opts.useBuiltIns),
  };
}
