import { declare } from "@babel/helper-plugin-utils";
import type { NodePath, types as t } from "@babel/core";

/**
 * Given a bigIntLiteral or NumericLiteral, remove numeric
 * separator `_` from its raw representation
 *
 * @param {NodePath<BigIntLiteral | NumericLiteral>} { node }: A Babel AST node path
 */
function remover({ node }: NodePath<t.BigIntLiteral | t.NumericLiteral>) {
  const { extra } = node;
  // @ts-expect-error todo(flow->ts)
  if (extra?.raw?.includes("_")) {
    // @ts-expect-error todo(flow->ts)
    extra.raw = extra.raw.replace(/_/g, "");
  }
}

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0-0"));

  return {
    name: "transform-numeric-separator",
    manipulateOptions: process.env.BABEL_8_BREAKING
      ? undefined
      : (_, parser) => parser.plugins.push("numericSeparator"),

    visitor: {
      NumericLiteral: remover,
      BigIntLiteral: remover,
    },
  };
});
