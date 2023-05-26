import * as t from "@babel/types";

export default function generateAsserts() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import type * as t from "@babel/types";
import type NodePath from "../index";

type Opts<Object> = Partial<{
  [Prop in keyof Object]: Object[Prop] extends t.Node
    ? t.Node | Object[Prop]
    : Object[Prop] extends t.Node[]
    ? t.Node[] | Object[Prop]
    : Object[Prop];
}>;

export interface NodePathAssertions {`;

  for (const type of [...t.TYPES].sort()) {
    output += `
  assert${type}(
    opts?: Opts<t.${type}>,
  ): asserts this is NodePath<t.${type}>;`;
  }

  output += `
}`;

  return output;
}
