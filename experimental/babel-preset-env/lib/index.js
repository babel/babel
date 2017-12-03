"use strict";

exports.__esModule = true;
exports.default = buildPreset;
exports.transformIncludesAndExcludes = exports.isPluginRequired = void 0;

var _semver = _interopRequireDefault(require("semver"));

var _builtIns = _interopRequireDefault(require("../data/built-ins.json"));

var _debug = require("./debug");

var _defaultIncludes = require("./default-includes");

var _moduleTransformations = _interopRequireDefault(require("./module-transformations"));

var _normalizeOptions2 = _interopRequireDefault(require("./normalize-options.js"));

var _plugins = _interopRequireDefault(require("../data/plugins.json"));

var _shippedProposals = require("../data/shipped-proposals.js");

var _useBuiltInsEntryPlugin = _interopRequireDefault(require("./use-built-ins-entry-plugin"));

var _useBuiltInsPlugin = _interopRequireDefault(require("./use-built-ins-plugin"));

var _targetsParser = _interopRequireDefault(require("./targets-parser"));

var _availablePlugins = _interopRequireDefault(require("./available-plugins"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPlugin = function getPlugin(pluginName) {
  var plugin = _availablePlugins.default[pluginName];

  if (!plugin) {
    throw new Error("Could not find plugin \"" + pluginName + "\". Ensure there is an entry in ./available-plugins.js for it.");
  }

  return plugin;
};

var builtInsListWithoutProposals = (0, _utils.filterStageFromList)(_builtIns.default, _shippedProposals.builtIns);
var pluginListWithoutProposals = (0, _utils.filterStageFromList)(_plugins.default, _shippedProposals.features);

var isPluginRequired = function isPluginRequired(supportedEnvironments, plugin) {
  var targetEnvironments = Object.keys(supportedEnvironments);

  if (targetEnvironments.length === 0) {
    return true;
  }

  var isRequiredForEnvironments = targetEnvironments.filter(function (environment) {
    if (!plugin[environment]) {
      return true;
    }

    var lowestImplementedVersion = plugin[environment];
    var lowestTargetedVersion = supportedEnvironments[environment];

    if ((0, _utils.isUnreleasedVersion)(lowestTargetedVersion, environment)) {
      return false;
    } else if ((0, _utils.isUnreleasedVersion)(lowestImplementedVersion, environment)) {
      return true;
    }

    if (!_semver.default.valid(lowestTargetedVersion)) {
      throw new Error("Invalid version passed for target \"" + environment + "\": \"" + lowestTargetedVersion + "\". Versions must be in semver format (major.minor.patch)");
    }

    return _semver.default.gt((0, _utils.semverify)(lowestImplementedVersion), lowestTargetedVersion);
  });
  return isRequiredForEnvironments.length > 0;
};

exports.isPluginRequired = isPluginRequired;
var hasBeenLogged = false;

var getBuiltInTargets = function getBuiltInTargets(targets) {
  var builtInTargets = Object.assign({}, targets);

  if (builtInTargets.uglify != null) {
    delete builtInTargets.uglify;
  }

  return builtInTargets;
};

var transformIncludesAndExcludes = function transformIncludesAndExcludes(opts) {
  return opts.reduce(function (result, opt) {
    var target = opt.match(/^(es\d+|web)\./) ? "builtIns" : "plugins";
    result[target].add(opt);
    return result;
  }, {
    all: opts,
    plugins: new Set(),
    builtIns: new Set()
  });
};

exports.transformIncludesAndExcludes = transformIncludesAndExcludes;

var getPlatformSpecificDefaultFor = function getPlatformSpecificDefaultFor(targets) {
  var targetNames = Object.keys(targets);
  var isAnyTarget = !targetNames.length;
  var isWebTarget = targetNames.some(function (name) {
    return name !== "node";
  });
  return isAnyTarget || isWebTarget ? _defaultIncludes.defaultWebIncludes : null;
};

var getOptionSpecificExcludesFor = function getOptionSpecificExcludesFor(_ref) {
  var loose = _ref.loose;
  var defaultExcludes = [];

  if (loose) {
    defaultExcludes.push("transform-typeof-symbol");
  }

  return defaultExcludes;
};

var filterItems = function filterItems(list, includes, excludes, targets, defaultIncludes, defaultExcludes) {
  var result = new Set();

  for (var item in list) {
    if (!excludes.has(item) && (isPluginRequired(targets, list[item]) || includes.has(item))) {
      result.add(item);
    } else {
      var shippedProposalsSyntax = _shippedProposals.pluginSyntaxMap.get(item);

      if (shippedProposalsSyntax) {
        result.add(shippedProposalsSyntax);
      }
    }
  }

  if (defaultIncludes) {
    defaultIncludes.forEach(function (item) {
      return !excludes.has(item) && result.add(item);
    });
  }

  if (defaultExcludes) {
    defaultExcludes.forEach(function (item) {
      return !includes.has(item) && result.delete(item);
    });
  }

  return result;
};

function buildPreset(api, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var _normalizeOptions = (0, _normalizeOptions2.default)(opts),
      configPath = _normalizeOptions.configPath,
      debug = _normalizeOptions.debug,
      optionsExclude = _normalizeOptions.exclude,
      forceAllTransforms = _normalizeOptions.forceAllTransforms,
      ignoreBrowserslistConfig = _normalizeOptions.ignoreBrowserslistConfig,
      optionsInclude = _normalizeOptions.include,
      loose = _normalizeOptions.loose,
      modules = _normalizeOptions.modules,
      shippedProposals = _normalizeOptions.shippedProposals,
      spec = _normalizeOptions.spec,
      optionsTargets = _normalizeOptions.targets,
      useBuiltIns = _normalizeOptions.useBuiltIns;

  var hasUglifyTarget = false;

  if (optionsTargets && optionsTargets.uglify) {
    hasUglifyTarget = true;
    delete optionsTargets.uglify;
    console.log("");
    console.log("The uglify target has been deprecated. Set the top level");
    console.log("option `forceAllTransforms: true` instead.");
    console.log("");
  }

  var targets = (0, _targetsParser.default)(optionsTargets, {
    ignoreBrowserslistConfig: ignoreBrowserslistConfig,
    configPath: configPath
  });
  var include = transformIncludesAndExcludes(optionsInclude);
  var exclude = transformIncludesAndExcludes(optionsExclude);
  var transformTargets = forceAllTransforms || hasUglifyTarget ? {} : targets;
  var transformations = filterItems(shippedProposals ? _plugins.default : pluginListWithoutProposals, include.plugins, exclude.plugins, transformTargets, null, getOptionSpecificExcludesFor({
    loose: loose
  }));
  var polyfills;
  var polyfillTargets;

  if (useBuiltIns) {
    polyfillTargets = getBuiltInTargets(targets);
    polyfills = filterItems(shippedProposals ? _builtIns.default : builtInsListWithoutProposals, include.builtIns, exclude.builtIns, polyfillTargets, getPlatformSpecificDefaultFor(polyfillTargets));
  }

  var plugins = [];
  var pluginUseBuiltIns = useBuiltIns !== false;

  if (modules !== false && _moduleTransformations.default[modules]) {
    plugins.push([getPlugin(_moduleTransformations.default[modules]), {
      loose: loose
    }]);
  }

  transformations.forEach(function (pluginName) {
    return plugins.push([getPlugin(pluginName), {
      spec: spec,
      loose: loose,
      useBuiltIns: pluginUseBuiltIns
    }]);
  });
  var regenerator = transformations.has("transform-regenerator");

  if (debug && !hasBeenLogged) {
    hasBeenLogged = true;
    console.log("@babel/preset-env: `DEBUG` option");
    console.log("\nUsing targets:");
    console.log(JSON.stringify((0, _utils.prettifyTargets)(targets), null, 2));
    console.log("\nUsing modules transform: " + modules.toString());
    console.log("\nUsing plugins:");
    transformations.forEach(function (transform) {
      (0, _debug.logPlugin)(transform, targets, _plugins.default);
    });

    if (!useBuiltIns) {
      console.log("\nUsing polyfills: No polyfills were added, since the `useBuiltIns` option was not set.");
    } else {
      console.log("\nUsing polyfills with `" + useBuiltIns + "` option:");
    }
  }

  if (useBuiltIns === "usage" || useBuiltIns === "entry") {
    var pluginOptions = {
      debug: debug,
      polyfills: polyfills,
      regenerator: regenerator,
      onDebug: function onDebug(polyfills, context) {
        polyfills.forEach(function (polyfill) {
          return (0, _debug.logPlugin)(polyfill, polyfillTargets, _builtIns.default, context);
        });
      }
    };
    plugins.push([useBuiltIns === "usage" ? _useBuiltInsPlugin.default : _useBuiltInsEntryPlugin.default, pluginOptions]);
  }

  return {
    plugins: plugins
  };
}