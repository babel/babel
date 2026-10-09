import type * as t from "../index.ts";

type MaybeArray = unknown[] | null | undefined;

type ArrayKeys<C> = {
  [K in keyof C]: C[K] extends MaybeArray ? K : never;
}[keyof C];

export default function inherit<C extends t.Node, P extends t.Node>(
  key: ArrayKeys<C> & ArrayKeys<P>,
  child: C,
  parent: P,
): void {
  if (child && parent) {
    const parentVal = parent[key] as MaybeArray;
    if (!parentVal) return;

    const childVal = child[key] as MaybeArray;

    (child[key] as MaybeArray) = Array.from(
      childVal
        ? new Set([...childVal, ...parentVal].filter(Boolean))
        : parentVal,
    );
  }
}
