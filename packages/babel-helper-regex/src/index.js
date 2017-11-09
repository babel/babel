import pull from "lodash/pull";
export { default as CACHE_KEY } from "./_cache-key";

export function is(node: Object, flag: string): boolean {
  return node.type === "RegExpLiteral" && node.flags.indexOf(flag) >= 0;
}

export function pullFlag(node: Object, flag: string) {
  const flags = node.flags.split("");
  if (node.flags.indexOf(flag) < 0) return;
  pull(flags, flag);
  node.flags = flags.join("");
}
