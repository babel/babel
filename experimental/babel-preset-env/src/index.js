import browserslist from "browserslist";

import builtInsList from "../data/built-ins.json";
import defaultInclude from "./default-includes";
import electronToChromium from "../data/electron-to-chromium";
import moduleTransformations from "./module-transformations";
import normalizeOptions from "./normalize-options.js";
import pluginList from "../data/plugins.json";
import transformPolyfillRequirePlugin from "./transform-polyfill-require-plugin";

/**
 * Determine if a transformation is required
 * @param  {Object}  supportedEnvironments  An Object containing environment keys and the lowest
 *                                          supported version as a value
 * @param  {Object}  plugin                 An Object containing environment keys and the lowest
 *                                          version the feature was implmented in as a value
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

export const electronVersionToChromeVersion = (semverVer) => {
  semverVer = String(semverVer);

  if (semverVer === "1") {
    semverVer = "1.0";
  }

  const m = semverVer.match(/^(\d+\.\d+)/);
  if (!m) {
    throw new Error("Electron version must be a semver version");
  }

  const result = electronToChromium[m[1]];
  if (!result) {
    throw new Error(`Electron version ${m[1]} is either too old or too new`);
  }

  return result;
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
  const targetOps = _extends({}, targets);

  if (targetOps.node === true || targetOps.node === "current") {
    targetOps.node = getCurrentNodeVersion();
  }

  // Rewrite Electron versions to their Chrome equivalents
  if (targetOps.electron) {
    targetOps.chrome = electronVersionToChromeVersion(targetOps.electron);
    delete targetOps.electron;
  }

  const browserOpts = targetOps.browsers;
  if (isBrowsersQueryValid(browserOpts)) {
    const queryBrowsers = getLowestVersions(browserslist(browserOpts));
    return mergeBrowsers(queryBrowsers, targetOps);
  }
  return targetOps;
};

let hasBeenLogged = false;

const logPlugin = (plugin, targets, list) => {
  const envList = list[plugin] || {};
  const filteredList = Object.keys(targets)
  .reduce((a, b) => {
    a[b] = envList[b];
    return a;
  }, {});
  const logStr = `  ${plugin} ${JSON.stringify(filteredList)}`;
  console.log(logStr);
};

const filterItem = (targets, exclusions, list, item) => {
  const isDefault = defaultInclude.indexOf(item) >= 0;
  const notExcluded = exclusions.indexOf(item) === -1;

  if (isDefault) return notExcluded;
  const isRequired = isPluginRequired(targets, list[item]);
  return isRequired && notExcluded;
};

export const transformIncludesAndExculdes = (opts) => ({
  all: opts,
  plugins: opts.filter((opt) => !opt.match(/^(es\d+|web)\./)),
  builtIns: opts.filter((opt) => opt.match(/^(es\d+|web)\./))
});

export default function buildPreset(context, opts = {}) {
  const validatedOptions = normalizeOptions(opts);
  const {debug, loose, moduleType, useBuiltIns} = validatedOptions;

  const targets = getTargets(validatedOptions.targets);
  const include = transformIncludesAndExculdes(validatedOptions.include);
  const exclude = transformIncludesAndExculdes(validatedOptions.exclude);

  const filterPlugins = filterItem.bind(null, targets, exclude.plugins, pluginList);
  const transformations = Object.keys(pluginList)
    .filter(filterPlugins)
    .concat(include.plugins);

  let polyfills;
  if (useBuiltIns) {
    const filterBuiltIns = filterItem.bind(null, targets, exclude.builtIns, builtInsList);

    polyfills = Object.keys(builtInsList)
      .concat(defaultInclude)
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
        logPlugin(polyfill, targets, builtInsList);
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
