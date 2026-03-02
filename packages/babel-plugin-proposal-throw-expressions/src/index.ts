import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "proposal-throw-expressions",
    manipulateOptions: (_, parser) => parser.plugins.push("throwExpressions"),

    visitor: {
      UnaryExpression(path) {
        const { operator, argument } = path.node;
        if (operator !== "throw") return;

        const arrow = t.functionExpression(
          null,
          [t.identifier("e")],
          t.blockStatement([t.throwStatement(t.identifier("e"))]),
        );

        path.replaceWith(t.callExpression(arrow, [argument]));
      },
    },
  };
});
