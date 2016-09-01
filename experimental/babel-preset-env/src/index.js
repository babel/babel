// use if ie
// "es3-member-expression-literals",
// "es3-property-literals",
// "proto-to-assign",
// "es5-property-mutators",

import includes from "lodash.includes";
import pluginList from "./plugins.js";

export const plugins = [
  "es3-member-expression-literals",
  "es3-property-literals",
  "proto-to-assign",
  "es5-property-mutators",
];

// modules?
export const modules = [
  "transform-es2015-modules-amd",
  "transform-es2015-modules-commonjs",
  "transform-es2015-modules-systemjs",
  "transform-es2015-modules-umd"
];

export const stagePlugins = [
  // "transform-class-constructor-call", proposal is removed
  "transform-class-properties",
  "transform-transform-decorators-legacy", // legacy plugin
  "transform-do-expressions",
  "transform-export-extensions",
  "transform-function-bind",
  "transform-object-rest-spread",
];

/**
 * Determine if a transformation is required
 * @param  {Object}  supportedEnvironments  An Object containing environment keys and the lowest
 *                                          supported version as a value
 * @param  {Object}  plugin                 An Object containing environment keys and the lowest
 *                                          version the feature was implmented in as a value
 * @return {Boolean}  Whether or not the transformation is required
 */
export const isPluginRequired = (supportedEnvironments, plugin) => {
  const targetEnvironments = Object.keys(supportedEnvironments);

  if (targetEnvironments.length === 0) { return true; }

  const isRequiredForEnvironments = targetEnvironments
    .filter(environemt => {
      // Feature is not implemented in that environment
      if (!plugin[environemt]) { return true; }

      const lowestImplementedVersion = plugin[environemt];
      const lowestTargetedVersion = targetEnvironments[environemt];
      if (lowestTargetedVersion <= lowestImplementedVersion) { return true; }

      return false;
    });

  return isRequiredForEnvironments.length > 0 ? true : false;
};

const getTargets = targetOpts => {
  return targetOpts || {};
}

// TODO: Allow specifying plugins as either shortened or full name
// babel-plugin-transform-es2015-classes
// transform-es2015-classes
const getLooseMode = looseOpts => {
  if (!looseOpts) { return []; }
  return looseOpts;
}

// TODO: Allow specifying modules as: Boolean, String or Array of module types
const getModules = modulesOpts => {
  if (!modulesOpts) { return []; }
  return modulesOpts;
}

export default function(opts) {
  const looseMode = getLooseMode(opts.loose);
  const modulesMode = getModules(opts.modules);
  const targets = getTargets(opts.targets);

  const transformations = Object.keys(pluginList)
    .filter(pluginName => isPluginRequired(targets, pluginList[pluginName]))
    .map(pluginName => {
      return includes(looseMode, pluginName)
        ? [require(`babel-plugin-${pluginName}`), { loose: true }]
        : require(`babel-plugin-${pluginName}`);
    });

  // TODO: Support loose mode
  const modules = Object.keys(modulesMode)
    .map(moduleType => {
      return [require(`babel-plugin-transform-es2015-modules-${moduleType}`)]
    });

  return {
    plugins: [
      ...modules,
      ...transformations
    ]
  }
}
