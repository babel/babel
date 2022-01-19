import * as t from "@babel/types";

export default function generateValidators() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import type * as t from "@babel/types";
import type NodePath from "../index";

export interface NodePathValidators {
`;

  for (const type of [...t.TYPES].sort()) {
    output += `is${type}<T extends t.Node>(this: NodePath<T>, opts?: object): this is NodePath<T & t.${type}>;`;
  }

  output += `
}
`;

  return output;
}
