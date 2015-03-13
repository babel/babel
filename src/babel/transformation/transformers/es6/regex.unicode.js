import rewritePattern from "regexpu/rewrite-pattern";
import * as regex from "../../helpers/regex";

export function check(node) {
  return regex.is(node, "u");
}

export function Literal(node) {
  if (!regex.is(node, "u")) return;
  node.regex.pattern = rewritePattern(node.regex.pattern, node.regex.flags);
  regex.pullFlag(node, "u");
}
