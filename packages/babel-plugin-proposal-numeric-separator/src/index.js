import syntaxNumericSeparator from "@babel/plugin-syntax-numeric-separator";
import { types as t } from "@babel/core";

export default function() {
  function replaceNumberArg({ node }) {
    if (node.callee.name !== "Number") {
      return;
    }

    const arg = node.arguments[0];
    if (!t.isStringLiteral(arg)) {
      return;
    }

    arg.value = arg.value.replace(/_/g, "");
  }

  return {
    inherits: syntaxNumericSeparator,

    visitor: {
      CallExpression: replaceNumberArg,
      NewExpression: replaceNumberArg,
      NumericLiteral({ node }) {
        const { extra } = node;
        if (extra && /_/.test(extra.raw)) {
          extra.raw = extra.raw.replace(/_/g, "");
        }
      },
    },
  };
}
