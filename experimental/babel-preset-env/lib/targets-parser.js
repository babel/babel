"use strict";

exports.__esModule = true;
exports.default = exports.semverMin = void 0;

var _browserslist = _interopRequireDefault(require("browserslist"));

var _semver = _interopRequireDefault(require("semver"));

var _utils = require("./utils");

var _normalizeOptions = require("./normalize-options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserNameMap = {
  android: "android",
  chrome: "chrome",
  and_chr: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ios_saf: "ios",
  safari: "safari"
};

var isBrowsersQueryValid = function isBrowsersQueryValid(browsers) {
  return typeof browsers === "string" || Array.isArray(browsers);
};

var semverMin = function semverMin(first, second) {
  return first && _semver.default.lt(first, second) ? first : second;
};

exports.semverMin = semverMin;

var mergeBrowsers = function mergeBrowsers(fromQuery, fromTarget) {
  return Object.keys(fromTarget).reduce(function (queryObj, targKey) {
    if (targKey !== "browsers") {
      queryObj[targKey] = fromTarget[targKey];
    }

    return queryObj;
  }, fromQuery);
};

var getLowestVersions = function getLowestVersions(browsers) {
  return browsers.reduce(function (all, browser) {
    var _browser$split = browser.split(" "),
        browserName = _browser$split[0],
        browserVersion = _browser$split[1];

    var normalizedBrowserName = browserNameMap[browserName];

    if (!normalizedBrowserName) {
      return all;
    }

    try {
      var splitVersion = browserVersion.split("-")[0].toLowerCase();

      if ((0, _utils.isUnreleasedVersion)(splitVersion, browserName)) {
        all[normalizedBrowserName] = (0, _utils.getLowestUnreleased)(all[normalizedBrowserName], splitVersion, browserName);
      }

      var parsedBrowserVersion = (0, _utils.semverify)(splitVersion);
      all[normalizedBrowserName] = semverMin(all[normalizedBrowserName], parsedBrowserVersion);
    } catch (e) {}

    return all;
  }, {});
};

var outputDecimalWarning = function outputDecimalWarning(decimalTargets) {
  if (!decimalTargets || !decimalTargets.length) {
    return;
  }

  console.log("Warning, the following targets are using a decimal version:");
  console.log("");
  decimalTargets.forEach(function (_ref) {
    var target = _ref.target,
        value = _ref.value;
    return console.log("  " + target + ": " + value);
  });
  console.log("");
  console.log("We recommend using a string for minor/patch versions to avoid numbers like 6.10");
  console.log("getting parsed as 6.1, which can lead to unexpected behavior.");
  console.log("");
};

var targetParserMap = {
  __default: function __default(target, value) {
    var version = (0, _utils.isUnreleasedVersion)(value, target) ? value.toLowerCase() : (0, _utils.semverify)(value);
    return [target, version];
  },
  node: function node(target, value) {
    var parsed = value === true || value === "current" ? process.versions.node : (0, _utils.semverify)(value);
    return [target, parsed];
  }
};

var getTargets = function getTargets(targets, options) {
  if (targets === void 0) {
    targets = {};
  }

  if (options === void 0) {
    options = {};
  }

  var targetOpts = {};
  var queryIsValid = isBrowsersQueryValid(targets.browsers);
  var browsersquery = queryIsValid ? targets.browsers : null;

  if (queryIsValid || !options.ignoreBrowserslistConfig) {
    _browserslist.default.defaults = (0, _normalizeOptions.objectToBrowserslist)(targets);
    var browsers = (0, _browserslist.default)(browsersquery, {
      path: options.configPath
    });
    var queryBrowsers = getLowestVersions(browsers);
    targets = mergeBrowsers(queryBrowsers, targets);
  }

  var parsed = Object.keys(targets).sort().reduce(function (results, target) {
    if (target !== "browsers") {
      var value = targets[target];

      if (typeof value === "number" && value % 1 !== 0) {
        results.decimalWarnings.push({
          target: target,
          value: value
        });
      }

      var parser = targetParserMap[target] || targetParserMap.__default;

      var _parser = parser(target, value),
          parsedTarget = _parser[0],
          parsedValue = _parser[1];

      if (parsedValue) {
        results.targets[parsedTarget] = parsedValue;
      }
    }

    return results;
  }, {
    targets: targetOpts,
    decimalWarnings: []
  });
  outputDecimalWarning(parsed.decimalWarnings);
  return parsed.targets;
};

var _default = getTargets;
exports.default = _default;