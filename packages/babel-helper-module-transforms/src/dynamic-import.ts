// Heavily inspired by
// https://github.com/airbnb/babel-plugin-dynamic-import-node/blob/master/src/utils.js

import * as t from "@babel/types";
import template from "@babel/template";

export function getDynamicImportSource(
  node: t.CallExpression,
): t.StringLiteral | t.TemplateLiteral {
  const [source] = node.arguments;

  return t.isStringLiteral(source) || t.isTemplateLiteral(source)
    ? source
    : (template.expression.ast`\`\${${source}}\`` as t.TemplateLiteral);
}
