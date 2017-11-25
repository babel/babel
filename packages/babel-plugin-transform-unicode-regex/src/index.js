import rewritePattern from "regexpu-core";
import * as regex from "@babel/helper-regex";
import CACHE_KEY from "./_cache-key";

export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    visitor: {
      RegExpLiteral({ node }) {
        if (!regex.is(node, "u")) return;
        node.pattern = rewritePattern(node.pattern, node.flags);
        regex.pullFlag(node, "u");
      },
    },
  };
}
