import { declare } from "@babel/helper-plugin-utils";
import syntaxNumericSeparator from "@babel/plugin-syntax-numeric-separator";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

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
    name: "proposal-numeric-separator",
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
});
