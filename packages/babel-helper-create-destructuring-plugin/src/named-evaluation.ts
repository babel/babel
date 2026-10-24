import { types as t } from "@babel/core";
import type { File } from "@babel/core";
import { isAnonymousFunctionDefinition } from "./util.ts";

/**
 * Wrap an anonymous function definition in `(0, fn)`, so that it doesn't
 * get the name of the identifier it is assigned to.
 */
export function preventNamedEvaluation(expr: t.Expression): t.Expression {
  return isAnonymousFunctionDefinition(expr)
    ? t.sequenceExpression([t.numericLiteral(0), expr])
    : expr;
}

/**
 * https://tc39.es/ecma262/#sec-static-semantics-isidentifierref
 * A parenthesized identifier is not an IdentifierReference: anonymous
 * functions assigned to it are not named.
 */
export function isIdentifierRef(node: t.Node): node is t.Identifier {
  return t.isIdentifier(node) && !node.extra?.parenthesized;
}

/**
 * The default value of `left`, named after it if it is an anonymous function
 * definition, as it would be by the destructuring pattern.
 * https://tc39.es/ecma262/#sec-runtime-semantics-namedevaluation
 */
export function buildNamedDefault(
  left: t.LVal,
  right: t.Expression,
  addHelper: File["addHelper"],
): t.Expression {
  if (!isIdentifierRef(left) || !isAnonymousFunctionDefinition(right)) {
    return right;
  }
  if (!t.isClassExpression(right)) {
    return t.callExpression(addHelper("setFunctionName"), [
      right,
      t.stringLiteral(left.name),
    ]);
  }
  // Property definitions infer the name before static initialization:
  //   { x: class {} }.x
  // `__proto__: value` would set the prototype instead: use a computed key.
  const computed = left.name === "__proto__";
  const key = computed ? t.stringLiteral(left.name) : t.identifier(left.name);
  return t.memberExpression(
    t.objectExpression([t.objectProperty(key, right, computed)]),
    t.cloneNode(key),
    computed,
  );
}
