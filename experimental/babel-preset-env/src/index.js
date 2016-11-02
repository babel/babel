import pluginList from "../data/plugins.json";
import browserslist from "browserslist";

export const MODULE_TRANSFORMATIONS = {
  "amd": "transform-es2015-modules-amd",
  "commonjs": "transform-es2015-modules-commonjs",
  "systemjs": "transform-es2015-modules-systemjs",
  "umd": "transform-es2015-modules-umd"
};

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

      if (lowestTargetedVersion < lowestImplementedVersion) {
        return true;
      }

      return false;
    });

  return isRequiredForEnvironments.length > 0 ? true : false;
};

const isBrowsersQueryValid = (browsers) => {
  return typeof browsers === "string" || Array.isArray(browsers);
};

const getLowestVersions = (browsers) => {
  return browsers.reduce((all, browser) => {
    const [browserName, browserVersion] = browser.split(" ");
    all[browserName] = parseInt(browserVersion);
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

export const getTargets = (targetOpts = {}) => {
  if (targetOpts.node === true || targetOpts.node === "current") {
    targetOpts.node = getCurrentNodeVersion();
  }

  const browserOpts = targetOpts.browsers;
  if (isBrowsersQueryValid(browserOpts)) {
    const queryBrowsers = getLowestVersions(browserslist(browserOpts));
    return mergeBrowsers(queryBrowsers, targetOpts);
  }
  return targetOpts;
};

// TODO: Allow specifying plugins as either shortened or full name
// babel-plugin-transform-es2015-classes
// transform-es2015-classes
export const validateLooseOption = (looseOpt = false) => {
  if (typeof looseOpt !== "boolean") {
    throw new Error("Preset env: 'loose' option must be a boolean.");
  }

  return looseOpt;
};

export const validateModulesOption = (modulesOpt = "commonjs") => {
  if (modulesOpt !== false && Object.keys(MODULE_TRANSFORMATIONS).indexOf(modulesOpt) === -1) {
    throw new Error("The 'modules' option must be 'false' to indicate no modules\n" +
      "or a module type which be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'");
  }

  return modulesOpt;
};

export const validateWhitelistOption = (whitelistOpt = []) => {
  if (!Array.isArray(whitelistOpt)) {
    throw new Error(`The 'whitelist' option must be an Array<string> of plugins
      {
        "presets": [
          ["env", {
            "targets": {
              "chrome": 50
            },
            "whitelist": ["transform-es2015-arrow-functions"]
          }]
        ]
      }
      was passed "${whitelistOpt}" instead
    `);
  }

  return whitelistOpt;
};

export default function buildPreset(context, opts = {}) {
  const loose = validateLooseOption(opts.loose);
  const moduleType = validateModulesOption(opts.modules);
  const whitelist = validateWhitelistOption(opts.whitelist);
  const targets = getTargets(opts.targets);
  const debug = opts.debug;

  let transformations = Object.keys(pluginList)
    .filter((pluginName) => isPluginRequired(targets, pluginList[pluginName]));

  if (debug) {
    console.log("");
    console.log(`Using targets: ${JSON.stringify(targets, null, 2)}`);
    console.log("");
    console.log("Using plugins:");
    console.log("");
    console.log(`module: ${moduleType}`);
    transformations.forEach((transform) => {
      let envList = pluginList[transform];
      let filteredList = Object.keys(targets)
      .reduce((a, b) => {
        a[b] = envList[b];
        return a;
      }, {});
      console.log(transform, JSON.stringify(filteredList, null, 2));
    });
  }

  transformations = [...transformations, ...whitelist].map((pluginName) => {
    return [require(`babel-plugin-${pluginName}`), { loose }];
  });

  const modules = [
    moduleType === "commonjs" && [require("babel-plugin-transform-es2015-modules-commonjs"), { loose }],
    moduleType === "systemjs" && [require("babel-plugin-transform-es2015-modules-systemjs"), { loose }],
    moduleType === "amd" && [require("babel-plugin-transform-es2015-modules-amd"), { loose }],
    moduleType === "umd" && [require("babel-plugin-transform-es2015-modules-umd"), { loose }],
  ].filter(Boolean);

  return {
    plugins: [
      ...modules,
      ...transformations
    ]
  };
}
