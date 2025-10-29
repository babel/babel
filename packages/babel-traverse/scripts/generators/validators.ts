import * as t from "@babel/types";

export default function generateValidators() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import type * as t from "@babel/types";
import type NodePath from "../index";
import type { VirtualTypeNodePathValidators } from "../lib/virtual-types-validator";

type Options<Obj> = Partial<{
  [Prop in Exclude<keyof Obj, "type">]: Obj[Prop] extends t.Node
    ? t.Node
    : Obj[Prop] extends t.Node[]
    ? t.Node[]
    : Obj[Prop];
}>;

interface BaseNodePathValidators {
`;

  for (const type of [...t.TYPES].sort()) {
    output += `is${type}(this: NodePath): this is NodePath<t.${type}>;`;
    output += `is${type}<Opts extends Options<t.${type}>>(this: NodePath, opts: Opts): this is NodePath<t.${type} & Opts>;`;
  }

  output += `
}

export interface NodePathValidators
  extends Omit<BaseNodePathValidators, keyof VirtualTypeNodePathValidators>,
    VirtualTypeNodePathValidators {}
`;

  return output;
}
