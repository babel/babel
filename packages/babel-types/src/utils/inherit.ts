import type * as t from "..";

export default function inherit<
  C extends t.Node | undefined,
  P extends t.Node | undefined,
>(key: keyof C & keyof P, child: C, parent: P): void {
  if (child && parent) {
    // @ts-expect-error Could further refine key definitions
    child[key] = Array.from(
      new Set([].concat(child[key], parent[key]).filter(Boolean)),
    );
  }
}
