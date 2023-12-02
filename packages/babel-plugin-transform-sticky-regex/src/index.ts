import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );

  return {
    name: "transform-sticky-regex",

    visitor: {
      RegExpLiteral(path) {
        const { node } = path;
        if (!node.flags.includes("y")) return;

        path.replaceWith(
          t.newExpression(t.identifier("RegExp"), [
            t.stringLiteral(node.pattern),
            t.stringLiteral(node.flags),
          ]),
        );
      },
    },
  };
});
