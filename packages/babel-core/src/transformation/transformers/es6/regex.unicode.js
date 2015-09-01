import rewritePattern from "regexpu/rewrite-pattern";
import * as regex from "../../helpers/regex";

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  RegexLiteral(node) {
    if (!regex.is(node, "u")) return;
    node.regex.pattern = rewritePattern(node.pattern, node.flags);
    regex.pullFlag(node, "u");
  }
};
