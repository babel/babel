import invariant from "invariant";
import builtInsList from "../data/built-ins.json";
import { defaultWebIncludes } from "./default-includes";
import moduleTransformations from "./module-transformations";
import pluginFeatures from "../data/plugin-features";

const validIncludesAndExcludes = new Set([
  ...Object.keys(pluginFeatures),
  ...Object.keys(moduleTransformations).map(m => moduleTransformations[m]),
  ...Object.keys(builtInsList),
  ...defaultWebIncludes,
]);

export const validateIncludesAndExcludes = (opts = [], type) => {
  invariant(
    Array.isArray(opts),
    `Invalid Option: The '${type}' option must be an Array<String> of plugins/built-ins`,
  );

  const unknownOpts = opts.filter(opt => !validIncludesAndExcludes.has(opt));

  invariant(
    unknownOpts.length === 0,
    `Invalid Option: The plugins/built-ins '${unknownOpts}' passed to the '${type}' option are not
    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env`,
  );

  return opts;
};

export const normalizePluginName = plugin =>
  plugin.replace(/^babel-plugin-/, "");

export const normalizePluginNames = plugins => plugins.map(normalizePluginName);

export const checkDuplicateIncludeExcludes = (include = [], exclude = []) => {
  const duplicates = include.filter(opt => exclude.indexOf(opt) >= 0);

  invariant(
    duplicates.length === 0,
    `Invalid Option: The plugins/built-ins '${duplicates}' were found in both the "include" and
    "exclude" options.`,
  );
};

export const validateBoolOption = (name, value, defaultValue) => {
  if (typeof value === "undefined") {
    value = defaultValue;
  }

  if (typeof value !== "boolean") {
    throw new Error(`Preset env: '${name}' option must be a boolean.`);
  }

  return value;
};

export const validateLooseOption = looseOpt =>
  validateBoolOption("loose", looseOpt, false);

export const validateSpecOption = specOpt =>
  validateBoolOption("spec", specOpt, false);

export const validateForceAllTransformsOption = forceAllTransforms =>
  validateBoolOption("forceAllTransforms", forceAllTransforms, false);

export const validateModulesOption = (modulesOpt = "commonjs") => {
  invariant(
    modulesOpt === false ||
      Object.keys(moduleTransformations).indexOf(modulesOpt) > -1,
    `Invalid Option: The 'modules' option must be either 'false' to indicate no modules, or a
    module type which can be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'.`,
  );

  return modulesOpt;
};

export const validateUseBuiltInsOption = (builtInsOpt = false) => {
  invariant(
    builtInsOpt === "usage" || builtInsOpt === false || builtInsOpt === "entry",
    `Invalid Option: The 'useBuiltIns' option must be either
    'false' (default) to indicate no polyfill,
    '"entry"' to indicate replacing the entry polyfill, or
    '"usage"' to import only used polyfills per file`,
  );

  return builtInsOpt;
};

export default function normalizeOptions(opts) {
  if (opts.exclude) {
    opts.exclude = normalizePluginNames(opts.exclude);
  }

  if (opts.whitelist || opts.include) {
    opts.include = normalizePluginNames(opts.whitelist || opts.include);
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
    moduleType: validateModulesOption(opts.modules),
    spec: validateSpecOption(opts.spec),
    targets: opts.targets,
    useBuiltIns: validateUseBuiltInsOption(opts.useBuiltIns),
  };
}
