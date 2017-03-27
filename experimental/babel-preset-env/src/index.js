import browserslist from "browserslist";
import builtInsList from "../data/built-ins.json";
import { defaultWebIncludes } from "./default-includes";
import moduleTransformations from "./module-transformations";
import normalizeOptions, { getElectronChromeVersion } from "./normalize-options.js";
import pluginList from "../data/plugins.json";
import transformPolyfillRequirePlugin from "./transform-polyfill-require-plugin";

/**
 * Determine if a transformation is required
 * @param  {Object}  supportedEnvironments  An Object containing environment keys and the lowest
 *                                          supported version as a value
 * @param  {Object}  plugin                 An Object containing environment keys and the lowest
 *                                          version the feature was implemented in as a value
 * @return {Boolean}  Whether or not the transformation is required
 */
export const isPluginRequired = (supportedEnvironments, plugin) => {
  if (supportedEnvironments.browsers) {
    supportedEnvironments = getTargets(supportedEnvironments);
  }

  const targetEnvironments = Object.keys(supportedEnvironments);

  if (targetEnvironments.length === 0) { return true; }

  const isRequiredForEnvironments = targetEnvironments
    .filter((environment) => {
      // Feature is not implemented in that environment
      if (!plugin[environment]) { return true; }

      const lowestImplementedVersion = plugin[environment];
      const lowestTargetedVersion = supportedEnvironments[environment];

      if (typeof lowestTargetedVersion === "string") {
        throw new Error(`Target version must be a number,
          '${lowestTargetedVersion}' was given for '${environment}'`);
      }

      return lowestTargetedVersion < lowestImplementedVersion;
    });

  return isRequiredForEnvironments.length > 0 ? true : false;
};

const isBrowsersQueryValid = (browsers) => {
  return typeof browsers === "string" || Array.isArray(browsers);
};

const browserNameMap = {
  chrome: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ios_saf: "ios",
  safari: "safari"
};

const getLowestVersions = (browsers) => {
  return browsers.reduce((all, browser) => {
    const [browserName, browserVersion] = browser.split(" ");
    const normalizedBrowserName = browserNameMap[browserName];
    const parsedBrowserVersion = parseInt(browserVersion);
    if (normalizedBrowserName && !isNaN(parsedBrowserVersion)) {
      all[normalizedBrowserName] = Math.min(all[normalizedBrowserName] || Infinity, parsedBrowserVersion);
    }
    return all;
  }, {});
};

const mergeBrowsers = (fromQuery, fromTarget) => {
  return Object.keys(fromTarget).reduce((queryObj, targKey) => {
    if (targKey !== "browsers") {
      queryObj[targKey] = fromTarget[targKey];
    }
    return queryObj;
  }, fromQuery);
};

export const getCurrentNodeVersion = () => {
  return parseFloat(process.versions.node);
};

const _extends = Object.assign || function (target) {
  for (let i = 1; i < arguments.length; i++) {
    const source = arguments[i];
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};


export const getTargets = (targets = {}) => {
  const targetOpts = _extends({}, targets);

  if (targetOpts.node === true || targetOpts.node === "current") {
    targetOpts.node = getCurrentNodeVersion();
  }

  if (targetOpts.hasOwnProperty("uglify") && !targetOpts.uglify) {
    delete targetOpts.uglify;
  }

  // Replace Electron target with its Chrome equivalent
  if (targetOpts.electron) {
    const electronChromeVersion = getElectronChromeVersion(targetOpts.electron);

    targetOpts.chrome = targetOpts.chrome
      ? Math.min(targetOpts.chrome, electronChromeVersion)
      : electronChromeVersion;

    delete targetOpts.electron;
  }

  const browserOpts = targetOpts.browsers;
  if (isBrowsersQueryValid(browserOpts)) {
    const queryBrowsers = getLowestVersions(browserslist(browserOpts));
    return mergeBrowsers(queryBrowsers, targetOpts);
  }
  return targetOpts;
};

let hasBeenLogged = false;

const logPlugin = (plugin, targets, list) => {
  const envList = list[plugin] || {};
  const filteredList = Object.keys(targets)
  .reduce((a, b) => {
    if (!envList[b] || targets[b] < envList[b]) {
      a[b] = targets[b];
    }
    return a;
  }, {});
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

const getBuiltInTargets = (targets) => {
  const builtInTargets = _extends({}, targets);
  if (builtInTargets.uglify != null) {
    delete builtInTargets.uglify;
  }
  return builtInTargets;
};

export const transformIncludesAndExcludes = (opts) => ({
  all: opts,
  plugins: opts.filter((opt) => !opt.match(/^(es\d+|web)\./)),
  builtIns: opts.filter((opt) => opt.match(/^(es\d+|web)\./))
});

function getPlatformSpecificDefaultFor(targets) {
  const targetNames = Object.keys(targets);
  const isAnyTarget = !targetNames.length;
  const isWebTarget = targetNames.some((name) => name !== "node");

  return (isAnyTarget || isWebTarget) ? defaultWebIncludes : [];
}

export default function buildPreset(context, opts = {}) {
  const validatedOptions = normalizeOptions(opts);
  const { debug, loose, moduleType, useBuiltIns } = validatedOptions;

  const targets = getTargets(validatedOptions.targets);
  const include = transformIncludesAndExcludes(validatedOptions.include);
  const exclude = transformIncludesAndExcludes(validatedOptions.exclude);


  const filterPlugins = filterItem.bind(null, targets, exclude.plugins, pluginList);
  const transformations = Object.keys(pluginList)
    .filter(filterPlugins)
    .concat(include.plugins);

  let polyfills;
  let polyfillTargets;
  if (useBuiltIns) {
    polyfillTargets = getBuiltInTargets(targets);
    const filterBuiltIns = filterItem.bind(null, polyfillTargets, exclude.builtIns, builtInsList);
    polyfills = Object.keys(builtInsList)
      .concat(getPlatformSpecificDefaultFor(polyfillTargets))
      .filter(filterBuiltIns)
      .concat(include.builtIns);
  }

  if (debug && !hasBeenLogged) {
    hasBeenLogged = true;
    console.log("babel-preset-env: `DEBUG` option");
    console.log("\nUsing targets:");
    console.log(JSON.stringify(targets, null, 2));
    console.log(`\nModules transform: ${moduleType}`);
    console.log("\nUsing plugins:");
    transformations.forEach((transform) => {
      logPlugin(transform, targets, pluginList);
    });
    if (useBuiltIns && polyfills.length) {
      console.log("\nUsing polyfills:");
      polyfills.forEach((polyfill) => {
        logPlugin(polyfill, polyfillTargets, builtInsList);
      });
    }
  }

  const regenerator = transformations.indexOf("transform-regenerator") >= 0;
  const modulePlugin = moduleType !== false && moduleTransformations[moduleType];
  const plugins = [];

  modulePlugin &&
    plugins.push([require(`babel-plugin-${modulePlugin}`), { loose }]);

  plugins.push(...transformations.map((pluginName) =>
    [require(`babel-plugin-${pluginName}`), { loose }]
  ));

  useBuiltIns &&
    plugins.push([transformPolyfillRequirePlugin, { polyfills, regenerator }]);

  return {
    plugins
  };
}
