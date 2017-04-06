import pull from "lodash/pull";
import * as t from "babel-types";

export function is(node: Object, flag: string): boolean {
  return t.isRegExpLiteral(node) && node.flags.indexOf(flag) >= 0;
}

export function pullFlag(node: Object, flag: string) {
  const flags = node.flags.split("");
  if (node.flags.indexOf(flag) < 0) return;
  pull(flags, flag);
  node.flags = flags.join("");
}
