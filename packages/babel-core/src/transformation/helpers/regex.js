import pull from "lodash/array/pull";
import * as t from "babel-types";

/**
 * [Please add a description.]
 */

export function is(node, flag) {
  return t.isRegexLiteral(node) && node.flags.indexOf(flag) >= 0;
}

/**
 * [Please add a description.]
 */

export function pullFlag(node, flag) {
  var flags = node.flags.split("");
  if (node.flags.indexOf(flag) < 0) return;
  pull(flags, flag);
  node.flags = flags.join("");
}
