import { declare } from "@babel/helper-plugin-utils";
import syntaxNumericSeparator from "@babel/plugin-syntax-numeric-separator";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "proposal-numeric-separator",
    inherits: syntaxNumericSeparator,

    visitor: {
      NumericLiteral({ node }) {
        const { extra } = node;
        if (extra && /_/.test(extra.raw)) {
          extra.raw = extra.raw.replace(/_/g, "");
        }
      },
    },
  };
});
