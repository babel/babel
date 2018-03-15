/**
 * Entry point for @babel/standalone. This wraps Babel's API in a version that's
 * friendlier for use in web browers. It removes the automagical detection of
 * plugins, instead explicitly registering all the available plugins and
 * presets, and requiring custom ones to be registered through `registerPlugin`
 * and `registerPreset` respectively.
 */

/* global VERSION */
/* eslint-disable max-len */

import {
  transform as babelTransform,
  transformFromAst as babelTransformFromAst,
  buildExternalHelpers as babelBuildExternalHelpers,
} from "@babel/core";

import { runScripts } from "./transformScriptTags";

const isArray =
  Array.isArray ||
  (arg => Object.prototype.toString.call(arg) === "[object Array]");

/**
 * Loads the given name (or [name, options] pair) from the given table object
 * holding the available presets or plugins.
 *
 * Returns undefined if the preset or plugin is not available; passes through
 * name unmodified if it (or the first element of the pair) is not a string.
 */
function loadBuiltin(builtinTable, name) {
  if (isArray(name) && typeof name[0] === "string") {
    if (builtinTable.hasOwnProperty(name[0])) {
      return [builtinTable[name[0]]].concat(name.slice(1));
    }
    return;
  } else if (typeof name === "string") {
    return builtinTable[name];
  }
  // Could be an actual preset/plugin module
  return name;
}

/**
 * Parses plugin names and presets from the specified options.
 */
function processOptions(options) {
  // Parse preset names
  const presets = (options.presets || []).map(presetName => {
    const preset = loadBuiltin(availablePresets, presetName);

    if (preset) {
      // workaround for babel issue
      // at some point, babel copies the preset, losing the non-enumerable
      // buildPreset key; convert it into an enumerable key.
      if (
        isArray(preset) &&
        typeof preset[0] === "object" &&
        preset[0].hasOwnProperty("buildPreset")
      ) {
        preset[0] = { ...preset[0], buildPreset: preset[0].buildPreset };
      }
    } else {
      throw new Error(
        `Invalid preset specified in Babel options: "${presetName}"`,
      );
    }
    return preset;
  });

  // Parse plugin names
  const plugins = (options.plugins || []).map(pluginName => {
    const plugin = loadBuiltin(availablePlugins, pluginName);

    if (!plugin) {
      throw new Error(
        `Invalid plugin specified in Babel options: "${pluginName}"`,
      );
    }
    return plugin;
  });

  return {
    babelrc: false,
    ...options,
    presets,
    plugins,
  };
}

export function transform(code, options) {
  return babelTransform(code, processOptions(options));
}

export function transformFromAst(ast, code, options) {
  return babelTransformFromAst(ast, code, processOptions(options));
}
export const availablePlugins = {};
export const availablePresets = {};
export const buildExternalHelpers = babelBuildExternalHelpers;
/**
 * Registers a named plugin for use with Babel.
 */
export function registerPlugin(name, plugin) {
  if (availablePlugins.hasOwnProperty(name)) {
    console.warn(
      `A plugin named "${name}" is already registered, it will be overridden`,
    );
  }
  availablePlugins[name] = plugin;
}
/**
 * Registers multiple plugins for use with Babel. `newPlugins` should be an object where the key
 * is the name of the plugin, and the value is the plugin itself.
 */
export function registerPlugins(newPlugins) {
  Object.keys(newPlugins).forEach(name =>
    registerPlugin(name, newPlugins[name]),
  );
}

/**
 * Registers a named preset for use with Babel.
 */
export function registerPreset(name, preset) {
  if (availablePresets.hasOwnProperty(name)) {
    console.warn(
      `A preset named "${name}" is already registered, it will be overridden`,
    );
  }
  availablePresets[name] = preset;
}
/**
 * Registers multiple presets for use with Babel. `newPresets` should be an object where the key
 * is the name of the preset, and the value is the preset itself.
 */
export function registerPresets(newPresets) {
  Object.keys(newPresets).forEach(name =>
    registerPreset(name, newPresets[name]),
  );
}

// All the plugins we should bundle
// Want to get rid of this long whitelist of plugins?
// Wait! Please read https://github.com/babel/babel/pull/6177 first.
registerPlugins({
  "external-helpers": require("@babel/plugin-external-helpers"),
  "syntax-async-generators": require("@babel/plugin-syntax-async-generators"),
  "syntax-class-properties": require("@babel/plugin-syntax-class-properties"),
  "syntax-decorators": require("@babel/plugin-syntax-decorators"),
  "syntax-do-expressions": require("@babel/plugin-syntax-do-expressions"),
  "syntax-dynamic-import": require("@babel/plugin-syntax-dynamic-import"),
  "syntax-export-default-from": require("@babel/plugin-syntax-export-default-from"),
  "syntax-export-namespace-from": require("@babel/plugin-syntax-export-namespace-from"),
  "syntax-flow": require("@babel/plugin-syntax-flow"),
  "syntax-function-bind": require("@babel/plugin-syntax-function-bind"),
  "syntax-function-sent": require("@babel/plugin-syntax-function-sent"),
  "syntax-import-meta": require("@babel/plugin-syntax-import-meta"),
  "syntax-jsx": require("@babel/plugin-syntax-jsx"),
  "syntax-object-rest-spread": require("@babel/plugin-syntax-object-rest-spread"),
  "syntax-optional-catch-binding": require("@babel/plugin-syntax-optional-catch-binding"),
  "syntax-pipeline-operator": require("@babel/plugin-syntax-pipeline-operator"),
  "syntax-typescript": require("@babel/plugin-syntax-typescript"),
  "transform-async-to-generator": require("@babel/plugin-transform-async-to-generator"),
  "proposal-async-generator-functions": require("@babel/plugin-proposal-async-generator-functions"),
  "proposal-class-properties": require("@babel/plugin-proposal-class-properties"),
  "proposal-decorators": require("@babel/plugin-proposal-decorators"),
  "proposal-do-expressions": require("@babel/plugin-proposal-do-expressions"),
  "proposal-export-default-from": require("@babel/plugin-proposal-export-default-from"),
  "proposal-export-namespace-from": require("@babel/plugin-proposal-export-namespace-from"),
  "proposal-pipeline-operator": require("@babel/plugin-proposal-pipeline-operator"),
  "transform-arrow-functions": require("@babel/plugin-transform-arrow-functions"),
  "transform-block-scoped-functions": require("@babel/plugin-transform-block-scoped-functions"),
  "transform-block-scoping": require("@babel/plugin-transform-block-scoping"),
  "transform-classes": require("@babel/plugin-transform-classes"),
  "transform-computed-properties": require("@babel/plugin-transform-computed-properties"),
  "transform-destructuring": require("@babel/plugin-transform-destructuring"),
  "transform-dotall-regex": require("@babel/plugin-transform-dotall-regex"),
  "transform-duplicate-keys": require("@babel/plugin-transform-duplicate-keys"),
  "transform-for-of": require("@babel/plugin-transform-for-of"),
  "transform-function-name": require("@babel/plugin-transform-function-name"),
  "transform-instanceof": require("@babel/plugin-transform-instanceof"),
  "transform-literals": require("@babel/plugin-transform-literals"),
  "transform-modules-amd": require("@babel/plugin-transform-modules-amd"),
  "transform-modules-commonjs": require("@babel/plugin-transform-modules-commonjs"),
  "transform-modules-systemjs": require("@babel/plugin-transform-modules-systemjs"),
  "transform-modules-umd": require("@babel/plugin-transform-modules-umd"),
  "transform-object-super": require("@babel/plugin-transform-object-super"),
  "transform-parameters": require("@babel/plugin-transform-parameters"),
  "transform-shorthand-properties": require("@babel/plugin-transform-shorthand-properties"),
  "transform-spread": require("@babel/plugin-transform-spread"),
  "transform-sticky-regex": require("@babel/plugin-transform-sticky-regex"),
  "transform-template-literals": require("@babel/plugin-transform-template-literals"),
  "transform-typeof-symbol": require("@babel/plugin-transform-typeof-symbol"),
  "transform-typescript": require("@babel/plugin-transform-typescript"),
  "transform-unicode-regex": require("@babel/plugin-transform-unicode-regex"),
  "transform-member-expression-literals": require("@babel/plugin-transform-member-expression-literals"),
  "transform-property-literals": require("@babel/plugin-transform-property-literals"),
  "transform-property-mutators": require("@babel/plugin-transform-property-mutators"),
  "transform-exponentiation-operator": require("@babel/plugin-transform-exponentiation-operator"),
  "transform-flow-comments": require("@babel/plugin-transform-flow-comments"),
  "transform-flow-strip-types": require("@babel/plugin-transform-flow-strip-types"),
  "proposal-function-bind": require("@babel/plugin-proposal-function-bind"),
  "transform-jscript": require("@babel/plugin-transform-jscript"),
  "transform-new-target": require("@babel/plugin-transform-new-target"),
  "transform-object-assign": require("@babel/plugin-transform-object-assign"),
  "proposal-object-rest-spread": require("@babel/plugin-proposal-object-rest-spread"),
  "transform-object-set-prototype-of-to-assign": require("@babel/plugin-transform-object-set-prototype-of-to-assign"),
  "proposal-optional-catch-binding": require("@babel/plugin-proposal-optional-catch-binding"),
  "transform-proto-to-assign": require("@babel/plugin-transform-proto-to-assign"),
  "transform-react-constant-elements": require("@babel/plugin-transform-react-constant-elements"),
  "transform-react-display-name": require("@babel/plugin-transform-react-display-name"),
  "transform-react-inline-elements": require("@babel/plugin-transform-react-inline-elements"),
  "transform-react-jsx": require("@babel/plugin-transform-react-jsx"),
  "transform-react-jsx-compat": require("@babel/plugin-transform-react-jsx-compat"),
  "transform-react-jsx-self": require("@babel/plugin-transform-react-jsx-self"),
  "transform-react-jsx-source": require("@babel/plugin-transform-react-jsx-source"),
  "transform-regenerator": require("@babel/plugin-transform-regenerator"),
  "transform-runtime": require("@babel/plugin-transform-runtime"),
  "transform-strict-mode": require("@babel/plugin-transform-strict-mode"),
  "proposal-unicode-property-regex": require("@babel/plugin-proposal-unicode-property-regex"),
});

// All the presets we should bundle
// Want to get rid of this whitelist of presets?
// Wait! Please read https://github.com/babel/babel/pull/6177 first.
registerPresets({
  es2015: require("@babel/preset-es2015"),
  es2016: require("@babel/preset-es2016"),
  es2017: require("@babel/preset-es2017"),
  react: require("@babel/preset-react"),
  "stage-0": require("@babel/preset-stage-0"),
  "stage-1": require("@babel/preset-stage-1"),
  "stage-2": require("@babel/preset-stage-2"),
  "stage-3": require("@babel/preset-stage-3"),
  "es2015-loose": {
    presets: [[require("@babel/preset-es2015"), { loose: true }]],
  },
  // ES2015 preset with es2015-modules-commonjs removed
  "es2015-no-commonjs": {
    presets: [[require("@babel/preset-es2015"), { modules: false }]],
  },
  typescript: require("@babel/preset-typescript"),
  flow: require("@babel/preset-flow"),
});

export const version = VERSION;

function onDOMContentLoaded() {
  transformScriptTags();
}

// Listen for load event if we're in a browser and then kick off finding and
// running of scripts with "text/babel" type.
if (typeof window !== "undefined" && window && window.addEventListener) {
  window.addEventListener("DOMContentLoaded", onDOMContentLoaded, false);
}

/**
 * Transform <script> tags with "text/babel" type.
 * @param {Array} scriptTags specify script tags to transform, transform all in the <head> if not given
 */
export function transformScriptTags(scriptTags) {
  runScripts(transform, scriptTags);
}

/**
 * Disables automatic transformation of <script> tags with "text/babel" type.
 */
export function disableScriptTags() {
  window.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
}
