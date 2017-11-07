import rewritePattern from "regexpu-core";
import * as regex from "@babel/helper-regex";

export default function(api, options) {
  const { useUnicodeFlag = false } = options;
  if (typeof useUnicodeFlag !== "boolean") {
    throw new Error(".useUnicodeFlag must be a boolean, or undefined");
  }

  return {
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
