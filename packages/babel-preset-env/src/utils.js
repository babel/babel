// @flow

import * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";
import { addSideEffect } from "@babel/helper-module-imports";
import type { Targets } from "@babel/helper-compilation-targets";

export const has = Object.hasOwnProperty.call.bind(Object.hasOwnProperty);

export function getType(target: any): string {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
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
