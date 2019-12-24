// @flow

import * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";
import invariant from "invariant";
import semver from "semver";
import { addSideEffect } from "@babel/helper-module-imports";
import unreleasedLabels from "../data/unreleased-labels";
import { semverMin } from "./targets-parser";
import type { Targets } from "./types";

export const has = Object.hasOwnProperty.call.bind(Object.hasOwnProperty);

export function getType(target: any): string {
  return Object.prototype.toString
    .call(target)
    .slice(8, -1)
    .toLowerCase();
}

const versionRegExp = /^(\d+|\d+.\d+)$/;

// Convert version to a semver value.
// 2.5 -> 2.5.0; 1 -> 1.0.0;
export function semverify(version: number | string): string {
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

export function intersection<T>(
  first: Set<T>,
  second: Set<T>,
  third: Set<T>,
): Set<T> {
  const result = new Set();
  for (const el of first) {
    if (second.has(el) && third.has(el)) result.add(el);
  }
  return result;
}

export function prettifyVersion(version: string) {
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

export function prettifyTargets(targets: Targets): Targets {
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

export function isUnreleasedVersion(
  version: string | number,
  env: string,
): boolean {
  const unreleasedLabel = unreleasedLabels[env];
  return (
    !!unreleasedLabel && unreleasedLabel === version.toString().toLowerCase()
  );
}

export function getLowestUnreleased(a: string, b: string, env: string): string {
  const unreleasedLabel = unreleasedLabels[env];
  const hasUnreleased = [a, b].some(item => item === unreleasedLabel);
  if (hasUnreleased) {
    return a === hasUnreleased ? b : a || b;
  }
  return semverMin(a, b);
}

export function filterStageFromList(
  list: { [feature: string]: Targets },
  stageList: { [feature: string]: boolean },
) {
  return Object.keys(list).reduce((result, item) => {
    if (!stageList[item]) {
      result[item] = list[item];
    }

    return result;
  }, {});
}

export function getImportSource({ node }: NodePath) {
  if (node.specifiers.length === 0) return node.source.value;
}

export function getRequireSource({ node }: NodePath) {
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

export function isPolyfillSource(source: ?string): boolean {
  return source === "@babel/polyfill" || source === "core-js";
}

const modulePathMap = {
  "regenerator-runtime": "regenerator-runtime/runtime",
};

export function getModulePath(mod: string): string {
  return modulePathMap[mod] || `core-js/modules/${mod}`;
}

export function createImport(path: NodePath, mod: string) {
  return addSideEffect(path, getModulePath(mod));
}

export function isNamespaced(path: NodePath) {
  if (!path.node) return false;
  const binding = path.scope.getBinding(path.node.name);
  if (!binding) return false;
  return binding.path.isImportNamespaceSpecifier();
}
