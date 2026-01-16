import type * as t from "../index.ts";

export default function inherit<C extends t.Node, P extends t.Node>(
  key: keyof C & keyof P,
  child: C,
  parent: P,
): void {
  if (child && parent) {
    // @ts-expect-error Could further refine key definitions
    child[key] = Array.from(
      new Set(([] as any[]).concat(child[key], parent[key]).filter(Boolean)),
    );
  }
}
