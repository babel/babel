import rewritePattern from "regexpu/rewrite-pattern";
import pull from "lodash/array/pull";
import t from "../../../types";

export function check(node) {
  return t.isLiteral(node) && node.regex && node.regex.flags.indexOf("u") >= 0;
}

export function Literal(node) {
  var regex = node.regex;
  if (!regex) return;

  var flags = regex.flags.split("");
  if (regex.flags.indexOf("u") < 0) return;
  pull(flags, "u");

  regex.pattern = rewritePattern(regex.pattern, regex.flags);
  regex.flags   = flags.join("");
}
