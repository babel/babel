//@flow

import invariant from "invariant";
import builtInsList from "../data/built-ins.json";
import { defaultWebIncludes } from "./default-includes";
import moduleTransformations from "./module-transformations";
import pluginFeatures from "../data/plugin-features";
import type { Options, ModuleOption, BuiltInsOption } from "./types";

const validIncludesAndExcludes = new Set([
  ...Object.keys(pluginFeatures),
  ...Object.keys(moduleTransformations).map(m => moduleTransformations[m]),
  ...Object.keys(builtInsList),
  ...defaultWebIncludes,
]);

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
    `Invalid Option: The plugins/built-ins '${unknownOpts.join(", ")}' passed to the '${type}' option are not
    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env`,
  );

  return opts;
};

export const normalizePluginName = (plugin: string): string =>
  plugin.replace(/^babel-plugin-/, "");

export const normalizePluginNames = (plugins: Array<string>): Array<string> =>
  plugins.map(normalizePluginName);

export const checkDuplicateIncludeExcludes = (
  include: Array<string> = [],
  exclude: Array<string> = [],
): void => {
  const duplicates: Array<string> = include.filter(
    opt => exclude.indexOf(opt) >= 0,
  );

  invariant(
    duplicates.length === 0,
    `Invalid Option: The plugins/built-ins '${duplicates.join(", ")}' were found in both the "include" and
    "exclude" options.`,
  );
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

export const validateLooseOption = (looseOpt: boolean) =>
  validateBoolOption("loose", looseOpt, false);

export const validateSpecOption = (specOpt: boolean) =>
  validateBoolOption("spec", specOpt, false);

export const validateForceAllTransformsOption = (forceAllTransforms: boolean) =>
  validateBoolOption("forceAllTransforms", forceAllTransforms, false);

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
    opts.exclude = normalizePluginNames(opts.exclude);
  }

  if (opts.include) {
    opts.include = normalizePluginNames(opts.include);
  }

  checkDuplicateIncludeExcludes(opts.include, opts.exclude);

  return {
    debug: opts.debug,
    exclude: validateIncludesAndExcludes(opts.exclude, "exclude"),
    forceAllTransforms: validateForceAllTransformsOption(
      opts.forceAllTransforms,
    ),
    include: validateIncludesAndExcludes(opts.include, "include"),
    loose: validateLooseOption(opts.loose),
    modules: validateModulesOption(opts.modules),
    spec: validateSpecOption(opts.spec),
    targets: opts.targets,
    useBuiltIns: validateUseBuiltInsOption(opts.useBuiltIns),
  };
}
