// Heavily inspired by
// https://github.com/airbnb/babel-plugin-dynamic-import-node/blob/master/src/utils.js

import type { NodePath } from "@babel/traverse";
import { types as t, template, type File } from "@babel/core";
import { getDynamicImportSource } from "@babel/helper-module-transforms";

const requireNoInterop = (source: t.Expression) =>
  template.expression.ast`require(${source})`;

const requireInterop = (source: t.Expression, file: File) =>
  t.callExpression(file.addHelper("interopRequireWildcard"), [
    requireNoInterop(source),
  ]);

export function transformDynamicImport(
  path: NodePath<t.CallExpression>,
  noInterop: boolean,
  file: File,
) {
  const buildRequire = noInterop ? requireNoInterop : requireInterop;

  const source = getDynamicImportSource(path.node);

  const replacement =
    t.isStringLiteral(source) ||
    (t.isTemplateLiteral(source) && source.quasis.length === 0)
      ? template.expression.ast`
        Promise.resolve().then(() => ${buildRequire(source, file)})
      `
      : template.expression.ast`
        Promise.resolve(${source}).then(
          s => ${buildRequire(t.identifier("s"), file)}
        )
      `;

  path.replaceWith(replacement);
}
