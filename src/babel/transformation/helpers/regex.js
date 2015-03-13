import pull from "lodash/array/pull";
import * as t from "../../types";

export function is(node, flag) {
  return t.isLiteral(node) && node.regex && node.regex.flags.indexOf(flag) >= 0;
}

export function pullFlag(node, flag) {
  var flags = node.regex.flags.split("");
  if (node.regex.flags.indexOf(flag) < 0) return;
  pull(flags, flag);
  node.regex.flags = flags.join("");
}
