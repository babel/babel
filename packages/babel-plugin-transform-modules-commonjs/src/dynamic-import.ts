// Heavily inspired by
// https://github.com/airbnb/babel-plugin-dynamic-import-node/blob/master/src/utils.js

import type { File, NodePath } from "@babel/core";
import { types as t, template } from "@babel/core";
import {
  buildDynamicImport,
  type RewriteModuleStatementsAndPrepareHeaderOptions,
} from "@babel/helper-module-transforms";

type ImportInterop =
  RewriteModuleStatementsAndPrepareHeaderOptions["importInterop"];

const requireNoInterop = (source: t.Expression) =>
  template.expression.ast`require(${source})`;

const requireInterop = (source: t.Expression, file: File) =>
  t.callExpression(file.addHelper("interopRequireWildcard"), [
    requireNoInterop(source),
  ]);

function getStaticSpecifier(specifier: t.Expression): string | undefined {
  if (t.isStringLiteral(specifier)) return specifier.value;
  if (t.isTemplateLiteral(specifier) && specifier.quasis.length === 1) {
    return specifier.quasis[0].value.cooked ?? undefined;
  }
}

function shouldSkipInteropHelper(
  importInterop: ImportInterop,
  specifier: t.Expression,
  filename: string | undefined,
) {
  if (typeof importInterop === "function") {
    const source = getStaticSpecifier(specifier);
    // When the specifier is only known at runtime, we cannot ask the
    // `importInterop` function, so we conservatively keep the interop helper.
    if (source === undefined) return false;
    return importInterop(source, filename) === "none";
  }
  return importInterop === "none";
}

export function transformDynamicImport(
  path: NodePath<t.CallExpression | t.ImportExpression>,
  importInterop: ImportInterop,
  file: File,
) {
  path.replaceWith(
    buildDynamicImport(path.node, true, false, specifier =>
      shouldSkipInteropHelper(importInterop, specifier, file.opts.filename)
        ? requireNoInterop(specifier)
        : requireInterop(specifier, file),
    ),
  );
}
