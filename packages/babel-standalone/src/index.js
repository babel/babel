/**
 * Entry point for babel-standalone. This wraps Babel's API in a version that's
 * friendlier for use in web browers. It removes the automagical detection of
 * plugins, instead explicitly registering all the available plugins and
 * presets, and requiring custom ones to be registered through `registerPlugin`
 * and `registerPreset` respectively.
 */

/* global VERSION */
/* eslint-disable max-len */

import * as Babel from "babel-core";

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
  return Babel.transform(code, processOptions(options));
}

export function transformFromAst(ast, code, options) {
  return Babel.transformFromAst(ast, code, processOptions(options));
}
export const availablePlugins = {};
export const availablePresets = {};
export const buildExternalHelpers = Babel.buildExternalHelpers;
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

// Bundle all the plugins included in the Babel repo
const pluginContext = require.context(
  __dirname + "/../../",
  /*useSubdirectories*/ true,
  /*filter*/ /\.\/babel-plugin-.+\/lib\/index\.js/,
);
pluginContext.keys().forEach(fileName => {
  const name = fileName.match(/babel-plugin-([^/]+)\//)[1];
  registerPlugin(name, pluginContext(fileName));
});

// Bundle all the presets included in the Babel repo
const presetContext = require.context(
  __dirname + "/../../",
  /*useSubdirectories*/ true,
  /*filter*/ /\.\/babel-preset-.+\/lib\/index\.js/,
);
presetContext.keys().forEach(fileName => {
  const name = fileName.match(/babel-preset-([^/]+)\//)[1];
  registerPreset(name, presetContext(fileName));
});

// Custom presets for backwards compatibility
registerPresets({
  "es2015-loose": {
    presets: [[require("babel-preset-es2015"), { loose: true }]],
  },
  // ES2015 preset with es2015-modules-commonjs removed
  "es2015-no-commonjs": {
    presets: [[require("babel-preset-es2015"), { modules: false }]],
  },
});

export const version = VERSION;

// Listen for load event if we're in a browser and then kick off finding and
// running of scripts with "text/babel" type.
if (typeof window !== "undefined" && window && window.addEventListener) {
  window.addEventListener(
    "DOMContentLoaded",
    () => transformScriptTags(),
    false,
  );
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
  window.removeEventListener("DOMContentLoaded", transformScriptTags);
}
