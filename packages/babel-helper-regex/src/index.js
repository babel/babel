// @flow

import type { NodePath } from "@babel/traverse";
import rewritePattern from "regexpu-core";

const options: WeakMap<Object, RegexpuOptions> = new WeakMap();
const flags: WeakMap<Object, Flags> = new WeakMap();

export type RegexpuOptions = {};
export type Flags = Set<string>;

export type Filter = (node: Object) => boolean;
export type ManipulateOptions = (options: RegexpuOptions) => ?RegexpuOptions;
export type ManipulateFlags = (flags: Flags) => ?Flags;

export function buildRegexpVisitor({
  filter = () => true,
  manipulateOptions = options => options,
  manipulateFlags = flags => flags,
}: {
  filter: Filter,
  manipulateOptions: ManipulateOptions,
  manipulateFlags: ManipulateFlags,
}) {
  return {
    RegExpLiteral: {
      enter({ node }: NodePath) {
        if (!filter(node)) return;
        const opts = options.get(node) || {};
        const fls = flags.get(node) || new Set(node.flags.split(""));
        options.set(node, manipulateOptions(opts) || opts);
        flags.set(node, manipulateFlags(fls) || fls);
      },
      exit({ node }: NodePath) {
        const opts = options.get(node);
        const fls = flags.get(node);
        if (!opts || !fls) return;
        options.delete(node);
        flags.delete(node);

        node.pattern = rewritePattern(node.pattern, node.flags, opts);
        node.flags = Array.from(fls).join("");
      },
    },
  };
}

export function is(node: Object, flag: string): boolean {
  return node.type === "RegExpLiteral" && node.flags.indexOf(flag) >= 0;
}
