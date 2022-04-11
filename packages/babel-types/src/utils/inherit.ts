import type * as t from "..";

export default function inherit(
  key: string,
  child: t.Node,
  parent: t.Node,
): void {
  if (child && parent) {
    child[key] = Array.from(
      new Set([].concat(child[key], parent[key]).filter(Boolean)),
    );
  }
}
