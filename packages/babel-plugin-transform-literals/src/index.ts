import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "transform-literals",

    visitor: {
      NumericLiteral({ node }) {
        // number octal like 0b10 or 0o70
        // @ts-expect-error Add node.extra typings
        if (node.extra && /^0[ob]/i.test(node.extra.raw)) {
          node.extra = undefined;
        }
      },

      StringLiteral({ node }) {
        // unicode escape
        // @ts-expect-error Add node.extra typings
        if (node.extra && /\\u/i.test(node.extra.raw)) {
          node.extra = undefined;
        }
      },
    },
  };
});
