"use strict";

exports.__esModule = true;
exports.logUsagePolyfills = exports.logEntryPolyfills = exports.logPlugin = exports.logMessage = void 0;

var _semver = _interopRequireDefault(require("semver"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wordEnds = function wordEnds(size) {
  return size > 1 ? "s" : "";
};

var logMessage = function logMessage(message, context) {
  var pre = context ? "[" + context + "] " : "";
  var logStr = "  " + pre + message;
  console.log(logStr);
};

exports.logMessage = logMessage;

var logPlugin = function logPlugin(plugin, targets, list, context) {
  var envList = list[plugin] || {};
  var filteredList = Object.keys(targets).reduce(function (a, b) {
    if (!envList[b] || _semver.default.lt(targets[b], (0, _utils.semverify)(envList[b]))) {
      a[b] = (0, _utils.prettifyVersion)(targets[b]);
    }

    return a;
  }, {});
  var formattedTargets = JSON.stringify(filteredList).replace(/,/g, ", ").replace(/^\{"/, '{ "').replace(/"\}$/, '" }');
  logMessage(plugin + " " + formattedTargets, context);
};

exports.logPlugin = logPlugin;

var logEntryPolyfills = function logEntryPolyfills(importPolyfillIncluded, polyfills, filename, onDebug) {
  if (!importPolyfillIncluded) {
    console.log("\n[" + filename + "] `import '@babel/polyfill'` was not found.");
    return;
  }

  if (!polyfills.size) {
    console.log("\n[" + filename + "] Based on your targets, none were added.");
    return;
  }

  console.log("\n[" + filename + "] Replaced `@babel/polyfill` with the following polyfill" + wordEnds(polyfills.size) + ":");
  onDebug(polyfills);
};

exports.logEntryPolyfills = logEntryPolyfills;

var logUsagePolyfills = function logUsagePolyfills(polyfills, filename, onDebug) {
  if (!polyfills.size) {
    console.log("\n[" + filename + "] Based on your code and targets, none were added.");
    return;
  }

  console.log("\n[" + filename + "] Added following polyfill" + wordEnds(polyfills.size) + ":");
  onDebug(polyfills);
};

exports.logUsagePolyfills = logUsagePolyfills;