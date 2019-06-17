import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
import bigintSyntax from "@babel/plugin-syntax-bigint";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-bigint",
    inherits: bigintSyntax,

    visitor: {
      BigIntLiteral(path) {
        const bigintCall = t.callExpression(t.identifier("BigInt"), [
          t.stringLiteral(path.node.value),
        ]);

        path.replaceWith(bigintCall);
      },
    },
  };
});
