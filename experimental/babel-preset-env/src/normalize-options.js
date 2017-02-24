import invariant from "invariant";
import builtInsList from "../data/built-ins.json";
import defaultInclude from "./default-includes";
import moduleTransformations from "./module-transformations";
import pluginFeatures from "../data/plugin-features";

const hasBeenWarned = false;

const validIncludesAndExcludes = [
  ...Object.keys(pluginFeatures),
  ...Object.keys(moduleTransformations).map((m) => moduleTransformations[m]),
  ...Object.keys(builtInsList),
  ...defaultInclude
];

export const validateIncludesAndExcludes = (opts = [], type) => {
  invariant(
    Array.isArray(opts),
    `Invalid Option: The '${type}' option must be an Array<String> of plugins/built-ins`
  );

  const unknownOpts = [];
  opts.forEach((opt) => {
    if (validIncludesAndExcludes.indexOf(opt) === -1) {
      unknownOpts.push(opt);
    }
  });

  invariant(
    unknownOpts.length === 0,
    `Invalid Option: The plugins/built-ins '${unknownOpts}' passed to the '${type}' option are not
    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env`
  );

  return opts;
};

export const checkDuplicateIncludeExcludes = (include = [], exclude = []) => {
  const duplicates = include.filter(
    (opt) => exclude.indexOf(opt) >= 0
  );

  invariant(
    duplicates.length === 0,
    `Invalid Option: The plugins/built-ins '${duplicates}' were found in both the "include" and
    "exclude" options.`
  );
};

// TODO: Allow specifying plugins as either shortened or full name
// babel-plugin-transform-es2015-classes
// transform-es2015-classes
export const validateLooseOption = (looseOpt = false) => {
  invariant(
    typeof looseOpt === "boolean",
    "Invalid Option: The 'loose' option must be a boolean."
  );

  return looseOpt;
};

export const validateModulesOption = (modulesOpt = "commonjs") => {
  invariant(
    modulesOpt === false || Object.keys(moduleTransformations).indexOf(modulesOpt) > -1,
    `Invalid Option: The 'modules' option must be either 'false' to indicate no modules, or a
    module type which can be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'.`
  );

  return modulesOpt;
};

export default function normalizeOptions(opts) {
  // TODO: remove whitelist in favor of include in next major
  if (opts.whitelist && !hasBeenWarned) {
    console.warn(
      `Deprecation Warning: The "whitelist" option has been deprecated in favor of "include" to
      match the newly added "exclude" option (instead of "blacklist").`
    );
  }

  invariant(
    !(opts.whitelist && opts.include),
    `Invalid Option: The "whitelist" and the "include" option are the same and one can be used at
    a time`
  );

  checkDuplicateIncludeExcludes(opts.whitelist || opts.include, opts.exclude);

  return {
    debug: opts.debug,
    exclude: validateIncludesAndExcludes(opts.exclude, "exclude"),
    include: validateIncludesAndExcludes(opts.whitelist || opts.include, "include"),
    loose: validateLooseOption(opts.loose),
    moduleType: validateModulesOption(opts.modules),
    targets: opts.targets,
    useBuiltIns: opts.useBuiltIns
  };
}
