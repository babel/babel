// Heavily inspired by
// https://github.com/airbnb/babel-plugin-dynamic-import-node/blob/master/src/utils.js

import { types as t, template } from "@babel/core";

export function buildDynamicImport(
  node: t.CallExpression | t.ImportExpression,
  deferToThen: boolean,
  wrapWithPromise: boolean,
  builder: (specifier: t.Expression) => t.Expression,
): t.Expression {
  const [specifier, options] = t.isCallExpression(node)
    ? node.arguments
    : [node.source, node.options];

  if (
    t.isStringLiteral(specifier) ||
    (t.isTemplateLiteral(specifier) && specifier.quasis.length === 0)
  ) {
    const result = deferToThen
      ? template.expression.ast`
          Promise.resolve().then(() => ${builder(specifier)})
        `
      : builder(specifier);
    // The options are not used, but they must still be evaluated
    return options
      ? t.sequenceExpression([options as t.Expression, result])
      : result;
  }

  const specifierToString = t.isTemplateLiteral(specifier)
    ? t.identifier("specifier")
    : t.templateLiteral(
        [t.templateElement({ raw: "" }), t.templateElement({ raw: "" })],
        [t.identifier("specifier")],
      );

  let call: t.CallExpression;
  if (deferToThen) {
    call = template.expression.ast`
      (specifier =>
        new Promise(r => r(${specifierToString}))
          .then(s => ${builder(t.identifier("s"))})
      )(${specifier})
    ` as t.CallExpression;
  } else if (wrapWithPromise) {
    call = template.expression.ast`
      (specifier =>
        new Promise(r => r(${builder(specifierToString)}))
      )(${specifier})
    ` as t.CallExpression;
  } else {
    call = template.expression.ast`
      (specifier => ${builder(specifierToString)})(${specifier})
    ` as t.CallExpression;
  }
  // The options are not used, but they must still be evaluated after the
  // specifier
  if (options) call.arguments.push(options);
  return call;
}
