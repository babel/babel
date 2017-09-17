import rewritePattern from "regexpu-core";
import * as regex from "babel-helper-regex";

export default function() {
  function escape(pattern) {
    return pattern.replace(/\\/g, "\\\\");
  }

  function unescape(pattern) {
    return pattern.replace(/\\\\/g, "\\");
  }

  return {
    visitor: {
      RegExpLiteral({ node }) {
        if (!regex.is(node, "u")) return;
        node.pattern = unescape(
          rewritePattern(escape(node.pattern), node.flags),
        );
        regex.pullFlag(node, "u");
      },
    },
  };
}
