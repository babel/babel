import * as t from "@babel/types";
import invariant from "invariant";
import semver from "semver";
import levenshtein from "js-levenshtein";
import { addSideEffect } from "@babel/helper-module-imports";
import unreleasedLabels from "../data/unreleased-labels";
import { semverMin } from "./targets-parser";

export const has = Function.call.bind(Object.prototype.hasOwnProperty);

export function getType(target) {
  return Object.prototype.toString
    .call(target)
    .slice(8, -1)
    .toLowerCase();
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

export function intersection(first, second, third) {
  const result = new Set();
  for (const el of first) {
    if (second.has(el) && third.has(el)) result.add(el);
  }
  return result;
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

export function getImportSource({ node }) {
  if (node.specifiers.length === 0) return node.source.value;
}

export function getRequireSource({ node }) {
  if (!t.isExpressionStatement(node)) return;
  const { expression } = node;
  const isRequire =
    t.isCallExpression(expression) &&
    t.isIdentifier(expression.callee) &&
    expression.callee.name === "require" &&
    expression.arguments.length === 1 &&
    t.isStringLiteral(expression.arguments[0]);
  if (isRequire) return expression.arguments[0].value;
}

export function isPolyfillSource(source) {
  return source === "@babel/polyfill" || source === "core-js";
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
