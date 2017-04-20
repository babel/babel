import semver from "semver";
import builtInsList from "../data/built-ins.json";
import { logPlugin } from "./debug";
import { defaultWebIncludes } from "./default-includes";
import moduleTransformations from "./module-transformations";
import normalizeOptions from "./normalize-options.js";
import pluginList from "../data/plugins.json";
import useBuiltInsEntryPlugin from "./use-built-ins-entry-plugin";
import addUsedBuiltInsPlugin from "./use-built-ins-plugin";
import getTargets from "./targets-parser";
import { prettifyTargets, semverify } from "./utils";

/**
 * Determine if a transformation is required
 *
 * NOTE: This assumes `supportedEnvironments` has already been parsed by `getTargets`
 *
 * @param  {Object}  supportedEnvironments  An Object containing environment keys and the lowest
 *                                          supported version as a value
 * @param  {Object}  plugin                 An Object containing environment keys and the lowest
 *                                          version the feature was implemented in as a value
 * @return {Boolean} Whether or not the transformation is required
 */
export const isPluginRequired = (supportedEnvironments, plugin) => {
  const targetEnvironments = Object.keys(supportedEnvironments);

  if (targetEnvironments.length === 0) {
    return true;
  }

  const isRequiredForEnvironments = targetEnvironments.filter(environment => {
    // Feature is not implemented in that environment
    if (!plugin[environment]) {
      return true;
    }

    const lowestImplementedVersion = plugin[environment];
    const lowestTargetedVersion = supportedEnvironments[environment];

    if (!semver.valid(lowestTargetedVersion)) {
      throw new Error(
        // eslint-disable-next-line max-len
        `Invalid version passed for target "${environment}": "${lowestTargetedVersion}". Versions must be in semver format (major.minor.patch)`,
      );
    }

    return semver.gt(
      semverify(lowestImplementedVersion),
      lowestTargetedVersion,
    );
  });

  return isRequiredForEnvironments.length > 0;
};

let hasBeenLogged = false;

const getBuiltInTargets = targets => {
  const builtInTargets = Object.assign({}, targets);
  if (builtInTargets.uglify != null) {
    delete builtInTargets.uglify;
  }
  return builtInTargets;
};

export const transformIncludesAndExcludes = opts => {
  return opts.reduce(
    (result, opt) => {
      const target = opt.match(/^(es\d+|web)\./) ? "builtIns" : "plugins";
      result[target].add(opt);
      return result;
    },
    {
      all: opts,
      plugins: new Set(),
      builtIns: new Set(),
    },
  );
};

const getPlatformSpecificDefaultFor = targets => {
  const targetNames = Object.keys(targets);
  const isAnyTarget = !targetNames.length;
  const isWebTarget = targetNames.some(name => name !== "node");

  return isAnyTarget || isWebTarget ? defaultWebIncludes : null;
};

const filterItems = (list, includes, excludes, targets, defaultItems) => {
  const result = new Set();

  for (const item in list) {
    const excluded = excludes.has(item);

    if (!excluded && isPluginRequired(targets, list[item])) {
      result.add(item);
    }
  }

  if (defaultItems) {
    defaultItems.forEach(item => !excludes.has(item) && result.add(item));
  }

  includes.forEach(item => result.add(item));

  return result;
};

export default function buildPreset(context, opts = {}) {
  const validatedOptions = normalizeOptions(opts);
  const { debug, loose, moduleType, spec, useBuiltIns } = validatedOptions;

  const targets = getTargets(validatedOptions.targets);
  const include = transformIncludesAndExcludes(validatedOptions.include);
  const exclude = transformIncludesAndExcludes(validatedOptions.exclude);

  const transformations = filterItems(
    pluginList,
    include.plugins,
    exclude.plugins,
    targets,
  );

  let polyfills;
  let polyfillTargets;

  if (useBuiltIns) {
    polyfillTargets = getBuiltInTargets(targets);

    polyfills = filterItems(
      builtInsList,
      include.builtIns,
      exclude.builtIns,
      polyfillTargets,
      getPlatformSpecificDefaultFor(polyfillTargets),
    );
  }

  const plugins = [];

  if (moduleType !== false && moduleTransformations[moduleType]) {
    plugins.push([
      require(`babel-plugin-${moduleTransformations[moduleType]}`),
      { loose },
    ]);
  }

  // NOTE: not giving spec here yet to avoid compatibility issues when
  // babel-plugin-transform-es2015-modules-commonjs gets its spec mode
  transformations.forEach(pluginName =>
    plugins.push([require(`babel-plugin-${pluginName}`), { spec, loose }]));

  const regenerator = transformations.has("transform-regenerator");

  if (debug && !hasBeenLogged) {
    hasBeenLogged = true;
    console.log("babel-preset-env: `DEBUG` option");
    console.log("\nUsing targets:");
    console.log(JSON.stringify(prettifyTargets(targets), null, 2));
    console.log(`\nModules transform: ${moduleType}`);
    console.log("\nUsing plugins:");
    transformations.forEach(transform => {
      logPlugin(transform, targets, pluginList);
    });
    console.log("");
    console.log("Polyfills");
    console.log("=========");
    console.log("");

    if (!useBuiltIns) {
      console.log(
        "None were added, since the `useBuiltIns` option was not set.",
      );
    }
  }

  if (useBuiltIns === "usage" || useBuiltIns === "entry") {
    const pluginOptions = {
      debug,
      polyfills,
      regenerator,
      onDebug: (polyfills, context) => {
        polyfills.forEach(polyfill =>
          logPlugin(polyfill, polyfillTargets, builtInsList, context));
      },
    };

    plugins.push([
      useBuiltIns === "usage" ? addUsedBuiltInsPlugin : useBuiltInsEntryPlugin,
      pluginOptions,
    ]);
  }

  return {
    plugins,
  };
}
