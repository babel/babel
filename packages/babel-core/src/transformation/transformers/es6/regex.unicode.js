import rewritePattern from "regexpu/rewrite-pattern";
import * as regex from "../../helpers/regex";

export var visitor = {
  RegexLiteral(node) {
    if (!regex.is(node, "u")) return;
    node.regex.pattern = rewritePattern(node.pattern, node.flags);
    regex.pullFlag(node, "u");
  }
};
