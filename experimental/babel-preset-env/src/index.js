import semver from "semver";
import builtInsList from "../data/built-ins.json";
import { defaultWebIncludes } from "./default-includes";
import moduleTransformations from "./module-transformations";
import normalizeOptions from "./normalize-options.js";
import pluginList from "../data/plugins.json";
import useBuiltInsEntryPlugin from "./use-built-ins-entry-plugin";
import addUsedBuiltInsPlugin from "./use-built-ins-plugin";
import getTargets from "./targets-parser";
import { prettifyTargets, prettifyVersion, semverify } from "./utils";

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

const logPlugin = (plugin, targets, list) => {
  const envList = list[plugin] || {};
  const filteredList = Object.keys(targets).reduce(
    (a, b) => {
      if (!envList[b] || semver.lt(targets[b], semverify(envList[b]))) {
        a[b] = prettifyVersion(targets[b]);
      }
      return a;
    },
    {},
  );
  const logStr = `  ${plugin} ${JSON.stringify(filteredList)}`;
  console.log(logStr);
};

const filterItem = (targets, exclusions, list, item) => {
  const isDefault = defaultWebIncludes.indexOf(item) >= 0;
  const notExcluded = exclusions.indexOf(item) === -1;

  if (isDefault) return notExcluded;
  const isRequired = isPluginRequired(targets, list[item]);
  return isRequired && notExcluded;
};

const getBuiltInTargets = targets => {
  const builtInTargets = Object.assign({}, targets);
  if (builtInTargets.uglify != null) {
    delete builtInTargets.uglify;
  }
  return builtInTargets;
};

export const transformIncludesAndExcludes = opts => ({
  all: opts,
  plugins: opts.filter(opt => !opt.match(/^(es\d+|web)\./)),
  builtIns: opts.filter(opt => opt.match(/^(es\d+|web)\./)),
});

function getPlatformSpecificDefaultFor(targets) {
  const targetNames = Object.keys(targets);
  const isAnyTarget = !targetNames.length;
  const isWebTarget = targetNames.some(name => name !== "node");

  return isAnyTarget || isWebTarget ? defaultWebIncludes : [];
}

export default function buildPreset(context, opts = {}) {
  const validatedOptions = normalizeOptions(opts);
  const { debug, loose, moduleType, useBuiltIns } = validatedOptions;

  const targets = getTargets(validatedOptions.targets);
  const include = transformIncludesAndExcludes(validatedOptions.include);
  const exclude = transformIncludesAndExcludes(validatedOptions.exclude);

  const filterPlugins = filterItem.bind(
    null,
    targets,
    exclude.plugins,
    pluginList,
  );
  const transformations = Object.keys(pluginList)
    .filter(filterPlugins)
    .concat(include.plugins);

  let polyfills;
  let polyfillTargets;
  if (useBuiltIns) {
    polyfillTargets = getBuiltInTargets(targets);
    const filterBuiltIns = filterItem.bind(
      null,
      polyfillTargets,
      exclude.builtIns,
      builtInsList,
    );
    polyfills = Object.keys(builtInsList)
      .concat(getPlatformSpecificDefaultFor(polyfillTargets))
      .filter(filterBuiltIns)
      .concat(include.builtIns);
  }

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
  }

  const regenerator = transformations.indexOf("transform-regenerator") >= 0;
  const modulePlugin = moduleType !== false &&
    moduleTransformations[moduleType];
  const plugins = [];

  modulePlugin &&
    plugins.push([require(`babel-plugin-${modulePlugin}`), { loose }]);

  plugins.push(
    ...transformations.map(pluginName => [
      require(`babel-plugin-${pluginName}`),
      { loose },
    ]),
  );

  if (debug) {
    console.log("");
    console.log("Polyfills");
    console.log("=========");
    console.log("");
  }

  if (useBuiltIns === "usage") {
    plugins.push([
      addUsedBuiltInsPlugin,
      { polyfills: new Set(polyfills), regenerator, debug },
    ]);
  } else if (useBuiltIns === "entry") {
    plugins.push([
      useBuiltInsEntryPlugin,
      {
        debug,
        polyfills,
        regenerator,
        onDebug: polyfill => logPlugin(polyfill, polyfillTargets, builtInsList),
      },
    ]);
  } else if (debug) {
    console.log("None were added, since the `useBuiltIns` option was not set.");
  }

  return {
    plugins,
  };
}
