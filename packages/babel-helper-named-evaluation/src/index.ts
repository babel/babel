import {
  callExpression,
  cloneNode,
  identifier,
  isArrowFunctionExpression,
  isClassExpression,
  isFunctionExpression,
  isIdentifier,
  memberExpression,
  numericLiteral,
  objectExpression,
  objectProperty,
  sequenceExpression,
  stringLiteral,
} from "@babel/types";
import type * as t from "@babel/types";
import { skipTransparentExprWrapperNodes } from "@babel/helper-skip-transparent-expression-wrappers";

/**
 * https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
 * Parentheses and type wrappers (e.g. `as`, `!`) are transparent: they are
 * removed or don't change the named evaluation of the JavaScript output.
 */
export function isAnonymousFunctionDefinition(node: t.Node): boolean {
  node = skipTransparentExprWrapperNodes(node);
  if (isArrowFunctionExpression(node)) return true;
  if (isFunctionExpression(node) || isClassExpression(node)) {
    return !node.id;
  }
  return false;
}

/**
 * https://tc39.es/ecma262/#sec-static-semantics-isidentifierref
 * A parenthesized identifier is not an IdentifierReference: anonymous
 * functions assigned to it are not named.
 */
export function isIdentifierRef(node: t.Node): node is t.Identifier {
  return isIdentifier(node) && !node.extra?.parenthesized;
}

/**
 * The defaultValue of `target`: its Initializer, named after it if it is an
 * anonymous function definition, as it would be by the destructuring pattern
 * or the parameter list. `addHelper` returns a reference to a runtime helper
 * (`setFunctionName`).
 * https://tc39.es/ecma262/#sec-runtime-semantics-namedevaluation
 */
export function buildNamedDefault(
  target: t.Node,
  initializer: t.Expression,
  addHelper: (name: string) => t.Expression,
): t.Expression {
  if (!isIdentifierRef(target) || !isAnonymousFunctionDefinition(initializer)) {
    return initializer;
  }
  if (!isClassExpression(skipTransparentExprWrapperNodes(initializer))) {
    return callExpression(addHelper("setFunctionName"), [
      initializer,
      stringLiteral(target.name),
    ]);
  }
  // Property definitions infer the name before static initialization:
  //   { x: class {} }.x
  // `__proto__: value` would set the prototype instead: use a computed key.
  const computed = target.name === "__proto__";
  const key = computed ? stringLiteral(target.name) : identifier(target.name);
  return memberExpression(
    objectExpression([objectProperty(key, initializer, computed)]),
    cloneNode(key),
    computed,
  );
}

/**
 * Wrap an anonymous function definition in `(0, fn)`, so that it doesn't
 * get the name of the identifier it is assigned to.
 */
export function preventNamedEvaluation(expr: t.Expression): t.Expression {
  return isAnonymousFunctionDefinition(expr)
    ? sequenceExpression([numericLiteral(0), expr])
    : expr;
}
