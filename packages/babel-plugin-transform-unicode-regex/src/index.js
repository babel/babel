import { declare } from "@babel/helper-plugin-utils";
import rewritePattern from "regexpu-core";
import * as regex from "@babel/helper-regex";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-unicode-regex",

    visitor: {
      RegExpLiteral({ node }) {
        if (!regex.is(node, "u")) return;
        node.pattern = rewritePattern(node.pattern, node.flags);
        regex.pullFlag(node, "u");
      },
    },
  };
});
