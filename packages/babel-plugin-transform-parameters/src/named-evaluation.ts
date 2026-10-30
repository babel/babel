import { types as t } from "@babel/core";
import type { File } from "@babel/core";
import { skipTransparentExprWrapperNodes } from "@babel/helper-skip-transparent-expression-wrappers";

/**
 * https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
 * Parentheses and type wrappers (e.g. `as`, `!`) are transparent: they are
 * removed or don't change the named evaluation of the JavaScript output.
 */
export function isAnonymousFunctionDefinition(node: t.Node): boolean {
  node = skipTransparentExprWrapperNodes(node);
  if (t.isArrowFunctionExpression(node)) return true;
  if (t.isFunctionExpression(node) || t.isClassExpression(node)) {
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
  return t.isIdentifier(node) && !node.extra?.parenthesized;
}

/**
 * The defaultValue of `target`: its Initializer, named after it if it is an
 * anonymous function definition, as it would be by the destructuring pattern
 * or the parameter list.
 * https://tc39.es/ecma262/#sec-runtime-semantics-namedevaluation
 */
export function buildNamedDefault(
  target: t.Node,
  initializer: t.Expression,
  addHelper: File["addHelper"],
): t.Expression {
  if (!isIdentifierRef(target) || !isAnonymousFunctionDefinition(initializer)) {
    return initializer;
  }
  if (!t.isClassExpression(skipTransparentExprWrapperNodes(initializer))) {
    return t.callExpression(addHelper("setFunctionName"), [
      initializer,
      t.stringLiteral(target.name),
    ]);
  }
  // Property definitions infer the name before static initialization:
  //   { x: class {} }.x
  // `__proto__: value` would set the prototype instead: use a computed key.
  const computed = target.name === "__proto__";
  const key = computed
    ? t.stringLiteral(target.name)
    : t.identifier(target.name);
  return t.memberExpression(
    t.objectExpression([t.objectProperty(key, initializer, computed)]),
    t.cloneNode(key),
    computed,
  );
}
