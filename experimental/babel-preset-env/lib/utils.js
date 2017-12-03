"use strict";

exports.__esModule = true;
exports.createImport = exports.getModulePath = exports.isRequire = exports.isPolyfillSource = exports.filterStageFromList = exports.getLowestUnreleased = exports.isUnreleasedVersion = exports.prettifyTargets = exports.prettifyVersion = exports.semverify = void 0;

var _semver = _interopRequireDefault(require("semver"));

var _unreleasedLabels = _interopRequireDefault(require("../data/unreleased-labels"));

var _targetsParser = require("./targets-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var semverify = function semverify(version) {
  if (typeof version === "string" && _semver.default.valid(version)) {
    return version;
  }

  var split = version.toString().split(".");

  while (split.length < 3) {
    split.push("0");
  }

  return split.join(".");
};

exports.semverify = semverify;

var prettifyVersion = function prettifyVersion(version) {
  if (typeof version !== "string") {
    return version;
  }

  var parts = [_semver.default.major(version)];

  var minor = _semver.default.minor(version);

  var patch = _semver.default.patch(version);

  if (minor || patch) {
    parts.push(minor);
  }

  if (patch) {
    parts.push(patch);
  }

  return parts.join(".");
};

exports.prettifyVersion = prettifyVersion;

var prettifyTargets = function prettifyTargets(targets) {
  return Object.keys(targets).reduce(function (results, target) {
    var value = targets[target];
    var unreleasedLabel = _unreleasedLabels.default[target];

    if (typeof value === "string" && unreleasedLabel !== value) {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {});
};

exports.prettifyTargets = prettifyTargets;

var isUnreleasedVersion = function isUnreleasedVersion(version, env) {
  var unreleasedLabel = _unreleasedLabels.default[env];
  return unreleasedLabel && unreleasedLabel === version.toString().toLowerCase();
};

exports.isUnreleasedVersion = isUnreleasedVersion;

var getLowestUnreleased = function getLowestUnreleased(a, b, env) {
  var unreleasedLabel = _unreleasedLabels.default[env];
  var hasUnreleased = [a, b].some(function (item) {
    return item === unreleasedLabel;
  });

  if (hasUnreleased) {
    return a === hasUnreleased ? b : a || b;
  }

  return (0, _targetsParser.semverMin)(a, b);
};

exports.getLowestUnreleased = getLowestUnreleased;

var filterStageFromList = function filterStageFromList(list, stageList) {
  return Object.keys(list).reduce(function (result, item) {
    if (!stageList[item]) {
      result[item] = list[item];
    }

    return result;
  }, {});
};

exports.filterStageFromList = filterStageFromList;

var isPolyfillSource = function isPolyfillSource(source) {
  return source === "@babel/polyfill";
};

exports.isPolyfillSource = isPolyfillSource;

var isRequire = function isRequire(t, path) {
  return t.isExpressionStatement(path.node) && t.isCallExpression(path.node.expression) && t.isIdentifier(path.node.expression.callee) && path.node.expression.callee.name === "require" && path.node.expression.arguments.length === 1 && t.isStringLiteral(path.node.expression.arguments[0]) && isPolyfillSource(path.node.expression.arguments[0].value);
};

exports.isRequire = isRequire;
var modulePathMap = {
  "regenerator-runtime": "regenerator-runtime/runtime"
};

var getModulePath = function getModulePath(mod) {
  return modulePathMap[mod] || "core-js/modules/" + mod;
};

exports.getModulePath = getModulePath;

var createImport = function createImport(t, polyfill, requireType) {
  if (requireType === void 0) {
    requireType = "import";
  }

  var modulePath = getModulePath(polyfill);

  if (requireType === "import") {
    var declar = t.importDeclaration([], t.stringLiteral(modulePath));
    declar._blockHoist = 3;
    return declar;
  }

  return t.expressionStatement(t.callExpression(t.identifier("require"), [t.stringLiteral(modulePath)]));
};

exports.createImport = createImport;