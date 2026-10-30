import { types as t } from "@babel/core";
import { isAnonymousFunctionDefinition } from "@babel/plugin-transform-parameters";

/**
 * Wrap an anonymous function definition in `(0, fn)`, so that it doesn't
 * get the name of the identifier it is assigned to.
 */
export function preventNamedEvaluation(expr: t.Expression): t.Expression {
  return isAnonymousFunctionDefinition(expr)
    ? t.sequenceExpression([t.numericLiteral(0), expr])
    : expr;
}
