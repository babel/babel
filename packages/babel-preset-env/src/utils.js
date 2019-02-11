import invariant from "invariant";
import semver from "semver";
import coreJSEntries from "core-js-compat/entries";
import levenshtein from "js-levenshtein";
import { addSideEffect } from "@babel/helper-module-imports";
import unreleasedLabels from "../data/unreleased-labels";
import { semverMin } from "./targets-parser";

export function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

const versionRegExp = /^(\d+|\d+.\d+)$/;

// Convert version to a semver value.
// 2.5 -> 2.5.0; 1 -> 1.0.0;
export function semverify(version) {
  if (typeof version === "string" && semver.valid(version)) {
    return version;
  }

  invariant(
    typeof version === "number" ||
      (typeof version === "string" && versionRegExp.test(version)),
    `'${version}' is not a valid version`,
  );

  const split = version.toString().split(".");
  while (split.length < 3) {
    split.push("0");
  }
  return split.join(".");
}

export function getValues(object) {
  return Object.keys(object).map(key => object[key]);
}

export function findSuggestion(options, option) {
  let levenshteinValue = Infinity;
  return options.reduce((suggestion, validOption) => {
    const value = levenshtein(validOption, option);
    if (value < levenshteinValue) {
      levenshteinValue = value;
      return validOption;
    }
    return suggestion;
  }, undefined);
}

export function prettifyVersion(version) {
  if (typeof version !== "string") {
    return version;
  }

  const parts = [semver.major(version)];
  const minor = semver.minor(version);
  const patch = semver.patch(version);

  if (minor || patch) {
    parts.push(minor);
  }

  if (patch) {
    parts.push(patch);
  }

  return parts.join(".");
}

export function prettifyTargets(targets) {
  return Object.keys(targets).reduce((results, target) => {
    let value = targets[target];

    const unreleasedLabel = unreleasedLabels[target];
    if (typeof value === "string" && unreleasedLabel !== value) {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {});
}

export function isUnreleasedVersion(version, env) {
  const unreleasedLabel = unreleasedLabels[env];
  return (
    !!unreleasedLabel && unreleasedLabel === version.toString().toLowerCase()
  );
}

export function getLowestUnreleased(a, b, env) {
  const unreleasedLabel = unreleasedLabels[env];
  const hasUnreleased = [a, b].some(item => item === unreleasedLabel);
  if (hasUnreleased) {
    return a === hasUnreleased ? b : a || b;
  }
  return semverMin(a, b);
}

export function filterStageFromList(list, stageList) {
  return Object.keys(list).reduce((result, item) => {
    if (!stageList[item]) {
      result[item] = list[item];
    }

    return result;
  }, {});
}

export function isPolyfillSource(source) {
  return source === "@babel/polyfill" || source === "core-js";
}

export function isCoreJSSource(source) {
  return has(coreJSEntries, source) && new Set(coreJSEntries[source]);
}

export function isRegeneratorSource(source) {
  return source === "regenerator-runtime/runtime";
}

const modulePathMap = {
  "regenerator-runtime": "regenerator-runtime/runtime",
};

export function getModulePath(mod) {
  return modulePathMap[mod] || `core-js/modules/${mod}`;
}

export function createImport(path, mod) {
  return addSideEffect(path, getModulePath(mod));
}

export function isRequire(t, path) {
  return (
    t.isExpressionStatement(path.node) &&
    t.isCallExpression(path.node.expression) &&
    t.isIdentifier(path.node.expression.callee) &&
    path.node.expression.callee.name === "require" &&
    path.node.expression.arguments.length === 1 &&
    t.isStringLiteral(path.node.expression.arguments[0])
  );
}

export function isPolyfillRequire(t, path) {
  return (
    isRequire(t, path) &&
    isPolyfillSource(path.node.expression.arguments[0].value)
  );
}

export function isCoreJSRequire(t, path) {
  return (
    isRequire(t, path) &&
    isCoreJSSource(path.node.expression.arguments[0].value)
  );
}

export function isRegeneratorRequire(t, path) {
  return (
    isRequire(t, path) &&
    isRegeneratorSource(path.node.expression.arguments[0].value)
  );
}
