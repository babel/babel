// @flow

import invariant from "invariant";
import semver from "semver";
import levenshtein from "js-levenshtein";
import { addSideEffect } from "@babel/helper-module-imports";
import unreleasedLabels from "../data/unreleased-labels";
import { semverMin } from "./targets-parser";
import type { Targets } from "./types";

const versionRegExp = /^(\d+|\d+.\d+)$/;

// Convert version to a semver value.
// 2.5 -> 2.5.0; 1 -> 1.0.0;
export const semverify = (version: string | number): string => {
  const isString = typeof version === "string";

  if (isString && semver.valid(version)) {
    return version;
  }

  invariant(
    typeof version === "number" || (isString && versionRegExp.test(version)),
    `'${version}' is not a valid version`,
  );

  const split = version.toString().split(".");
  while (split.length < 3) {
    split.push("0");
  }
  return split.join(".");
};

export const getValues = (object: Object) =>
  Object.keys(object).map(key => object[key]);

export const findSuggestion = (options: Array<string>, option: string) => {
  let levenshteinValue = Infinity;
  return options.reduce((suggestion, validOption) => {
    const value = levenshtein(validOption, option);
    if (value < levenshteinValue) {
      levenshteinValue = value;
      return validOption;
    }
    return suggestion;
  }, undefined);
};

export const prettifyVersion = (version: string): string => {
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
};

export const prettifyTargets = (targets: Targets): Object => {
  return Object.keys(targets).reduce((results, target) => {
    let value = targets[target];

    const unreleasedLabel = unreleasedLabels[target];
    if (typeof value === "string" && unreleasedLabel !== value) {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {});
};

export const isUnreleasedVersion = (version: string, env: string): boolean => {
  const unreleasedLabel = unreleasedLabels[env];
  return (
    !!unreleasedLabel && unreleasedLabel === version.toString().toLowerCase()
  );
};

export const getLowestUnreleased = (
  a: string,
  b: string,
  env: string,
): string => {
  const unreleasedLabel = unreleasedLabels[env];
  const hasUnreleased = [a, b].some(item => item === unreleasedLabel);
  if (hasUnreleased) {
    return a === hasUnreleased ? b : a || b;
  }
  return semverMin(a, b);
};

export const filterStageFromList = (list: any, stageList: any) => {
  return Object.keys(list).reduce((result, item) => {
    if (!stageList[item]) {
      result[item] = list[item];
    }

    return result;
  }, {});
};

export const isPolyfillSource = (source: string): boolean =>
  source === "@babel/polyfill" || source === "core-js";

const modulePathMap = {
  "regenerator-runtime": "regenerator-runtime/runtime",
};

export const getModulePath = (mod: string) =>
  modulePathMap[mod] || `core-js/modules/${mod}`;

export const createImport = (path: Object, mod: string) =>
  addSideEffect(path, getModulePath(mod));

export const isRequire = (t: Object, path: Object): boolean =>
  t.isExpressionStatement(path.node) &&
  t.isCallExpression(path.node.expression) &&
  t.isIdentifier(path.node.expression.callee) &&
  path.node.expression.callee.name === "require" &&
  path.node.expression.arguments.length === 1 &&
  t.isStringLiteral(path.node.expression.arguments[0]) &&
  isPolyfillSource(path.node.expression.arguments[0].value);
