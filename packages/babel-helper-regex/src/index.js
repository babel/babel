

import pull from "lodash/array/pull";
import * as t from "babel-types";

export function is(node, flag) {
  return t.isRegExpLiteral(node) && node.flags.indexOf(flag) >= 0;
}

export function pullFlag(node, flag) {
  let flags = node.flags.split("");
  if (node.flags.indexOf(flag) < 0) return;
  pull(flags, flag);
  node.flags = flags.join("");
}
