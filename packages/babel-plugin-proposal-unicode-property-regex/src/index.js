import rewritePattern from "regexpu-core";
import * as regex from "@babel/helper-regex";
import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function(api, options) {
  const { useUnicodeFlag = true } = options;
  if (typeof useUnicodeFlag !== "boolean") {
    throw new Error(".useUnicodeFlag must be a boolean, or undefined");
  }

  return {
    cacheKey: CACHE_KEY,
    visitor: {
      RegExpLiteral(path) {
        const node = path.node;
        if (!regex.is(node, "u")) {
          return;
        }
        node.pattern = rewritePattern(node.pattern, node.flags, {
          unicodePropertyEscape: true,
          useUnicodeFlag,
        });
        if (!useUnicodeFlag) {
          regex.pullFlag(node, "u");
        }
      },
    },
  };
}
