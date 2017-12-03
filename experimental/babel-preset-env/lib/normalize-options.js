"use strict";

exports.__esModule = true;
exports.default = normalizeOptions;
exports.validateUseBuiltInsOption = exports.objectToBrowserslist = exports.validateModulesOption = exports.validateIgnoreBrowserslistConfig = exports.validateBoolOption = exports.validateConfigPathOption = exports.checkDuplicateIncludeExcludes = exports.normalizePluginNames = exports.normalizePluginName = exports.validateIncludesAndExcludes = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _browserslist = _interopRequireDefault(require("browserslist"));

var _builtIns = _interopRequireDefault(require("../data/built-ins.json"));

var _defaultIncludes = require("./default-includes");

var _moduleTransformations = _interopRequireDefault(require("./module-transformations"));

var _plugins = _interopRequireDefault(require("../data/plugins.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validIncludesAndExcludes = new Set([].concat(Object.keys(_plugins.default), Object.keys(_moduleTransformations.default).map(function (m) {
  return _moduleTransformations.default[m];
}), Object.keys(_builtIns.default), _defaultIncludes.defaultWebIncludes));

var validateIncludesAndExcludes = function validateIncludesAndExcludes(opts, type) {
  if (opts === void 0) {
    opts = [];
  }

  (0, _invariant.default)(Array.isArray(opts), "Invalid Option: The '" + type + "' option must be an Array<String> of plugins/built-ins");
  var unknownOpts = opts.filter(function (opt) {
    return !validIncludesAndExcludes.has(opt);
  });
  (0, _invariant.default)(unknownOpts.length === 0, "Invalid Option: The plugins/built-ins '" + unknownOpts.join(", ") + "' passed to the '" + type + "' option are not\n    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env");
  return opts;
};

exports.validateIncludesAndExcludes = validateIncludesAndExcludes;
var validBrowserslistTargets = [].concat(Object.keys(_browserslist.default.data), Object.keys(_browserslist.default.aliases));

var normalizePluginName = function normalizePluginName(plugin) {
  return plugin.replace(/^babel-plugin-/, "");
};

exports.normalizePluginName = normalizePluginName;

var normalizePluginNames = function normalizePluginNames(plugins) {
  return plugins.map(normalizePluginName);
};

exports.normalizePluginNames = normalizePluginNames;

var checkDuplicateIncludeExcludes = function checkDuplicateIncludeExcludes(include, exclude) {
  if (include === void 0) {
    include = [];
  }

  if (exclude === void 0) {
    exclude = [];
  }

  var duplicates = include.filter(function (opt) {
    return exclude.indexOf(opt) >= 0;
  });
  (0, _invariant.default)(duplicates.length === 0, "Invalid Option: The plugins/built-ins '" + duplicates.join(", ") + "' were found in both the \"include\" and\n    \"exclude\" options.");
};

exports.checkDuplicateIncludeExcludes = checkDuplicateIncludeExcludes;

var validateConfigPathOption = function validateConfigPathOption(configPath) {
  if (configPath === void 0) {
    configPath = process.cwd();
  }

  (0, _invariant.default)(typeof configPath === "string", "Invalid Option: The configPath option '" + configPath + "' is invalid, only strings are allowed.");
  return configPath;
};

exports.validateConfigPathOption = validateConfigPathOption;

var validateBoolOption = function validateBoolOption(name, value, defaultValue) {
  if (typeof value === "undefined") {
    value = defaultValue;
  }

  if (typeof value !== "boolean") {
    throw new Error("Preset env: '" + name + "' option must be a boolean.");
  }

  return value;
};

exports.validateBoolOption = validateBoolOption;

var validateIgnoreBrowserslistConfig = function validateIgnoreBrowserslistConfig(ignoreBrowserslistConfig) {
  return validateBoolOption("ignoreBrowserslistConfig", ignoreBrowserslistConfig, false);
};

exports.validateIgnoreBrowserslistConfig = validateIgnoreBrowserslistConfig;

var validateModulesOption = function validateModulesOption(modulesOpt) {
  if (modulesOpt === void 0) {
    modulesOpt = "commonjs";
  }

  (0, _invariant.default)(modulesOpt === false || Object.keys(_moduleTransformations.default).indexOf(modulesOpt) > -1, "Invalid Option: The 'modules' option must be either 'false' to indicate no modules, or a\n    module type which can be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'.");
  return modulesOpt;
};

exports.validateModulesOption = validateModulesOption;

var objectToBrowserslist = function objectToBrowserslist(object) {
  return Object.keys(object).reduce(function (list, targetName) {
    if (validBrowserslistTargets.indexOf(targetName) >= 0) {
      var targetVersion = object[targetName];
      return list.concat(targetName + " " + targetVersion);
    }

    return list;
  }, []);
};

exports.objectToBrowserslist = objectToBrowserslist;

var validateUseBuiltInsOption = function validateUseBuiltInsOption(builtInsOpt) {
  if (builtInsOpt === void 0) {
    builtInsOpt = false;
  }

  (0, _invariant.default)(builtInsOpt === "usage" || builtInsOpt === false || builtInsOpt === "entry", "Invalid Option: The 'useBuiltIns' option must be either\n    'false' (default) to indicate no polyfill,\n    '\"entry\"' to indicate replacing the entry polyfill, or\n    '\"usage\"' to import only used polyfills per file");
  return builtInsOpt;
};

exports.validateUseBuiltInsOption = validateUseBuiltInsOption;

function normalizeOptions(opts) {
  if (opts.exclude) {
    opts.exclude = normalizePluginNames(opts.exclude);
  }

  if (opts.include) {
    opts.include = normalizePluginNames(opts.include);
  }

  checkDuplicateIncludeExcludes(opts.include, opts.exclude);
  return {
    configPath: validateConfigPathOption(opts.configPath),
    debug: opts.debug,
    exclude: validateIncludesAndExcludes(opts.exclude, "exclude"),
    forceAllTransforms: validateBoolOption("forceAllTransforms", opts.forceAllTransforms, false),
    ignoreBrowserslistConfig: validateIgnoreBrowserslistConfig(opts.ignoreBrowserslistConfig),
    include: validateIncludesAndExcludes(opts.include, "include"),
    loose: validateBoolOption("loose", opts.loose, false),
    modules: validateModulesOption(opts.modules),
    shippedProposals: validateBoolOption("shippedProposals", opts.shippedProposals, false),
    spec: validateBoolOption("loose", opts.spec, false),
    targets: opts.targets,
    useBuiltIns: validateUseBuiltInsOption(opts.useBuiltIns)
  };
}