import shallowEqual from "./shallowEqual.ts";
import type * as t from "../index.ts";

export type Options<Obj> = Partial<{
  [Prop in Exclude<keyof Obj, "type">]: Obj[Prop] extends t.Node
    ? t.Node
    : Obj[Prop] extends t.Node[]
      ? t.Node[]
      : Obj[Prop];
}>;

export default function isType<T extends t.Node>(
  type: T["type"],
  node: t.Node | null | undefined,
  opts: Options<t.ArrayExpression> | null | undefined,
): boolean {
  return node?.type === type && (opts == null || shallowEqual(node, opts));
}
