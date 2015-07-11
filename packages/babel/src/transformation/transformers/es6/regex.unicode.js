import rewritePattern from "regexpu/rewrite-pattern";
import * as regex from "../../helpers/regex";

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  Literal(node) {
    if (!regex.is(node, "u")) return;
    node.regex.pattern = rewritePattern(node.regex.pattern, node.regex.flags);
    regex.pullFlag(node, "u");
  }
};
