import rewritePattern from "regexpu/rewrite-pattern";
import * as regex from "../../helpers/regex";

export function check(node) {
  return regex.is(node, "u");
}

export function Literal(node) {
  if (!regex.is(node, "u")) return;
  regex.pullFlag(node, "y");
  node.regex.pattern = rewritePattern(node.regex.pattern, node.regex.flags);
}
