import * as t from "@babel/types";

export default function generateVisitorTypes() {
  const aliases = Object.keys(t.FLIPPED_ALIAS_KEYS).sort();
  const types = t.TYPES.filter(
    type => !Object.hasOwn(t.FLIPPED_ALIAS_KEYS, type)
  ).sort();

  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import type * as t from "@babel/types";

import type { ExplVisitNode, VisitNode } from "../types.ts";

export interface ExplVisitorBase<S> {`;

  for (const type of types) {
    output += `${type}?: ExplVisitNode<S, t.${type}>;`;
  }

  output += `
}

export interface VisitorBaseNodes<S> {`;

  for (const type of types) {
    output += `${type}?: VisitNode<S, t.${type}>;`;
  }

  output += `
}

export interface VisitorBaseAliases<S> {`;

  for (const type of aliases) {
    output += `${type}?: VisitNode<S, t.${type}>;`;
  }

  output += `
}
  `;

  return output;
}
