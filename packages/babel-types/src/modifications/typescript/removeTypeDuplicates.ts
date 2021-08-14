import {
  isTSAnyKeyword,
  isTSUnionType,
  isTSBaseType,
} from "../../validators/generated";
import type * as t from "../..";

/**
 * Dedupe type annotations.
 */
export default function removeTypeDuplicates(
  nodes: Array<t.TSType>,
): Array<t.TSType> {
  const generics = {};
  const bases = {};

  // store union type groups to circular references
  const typeGroups = new Set<t.TSType[]>();

  const types = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!node) continue;

    // detect duplicates
    if (types.indexOf(node) >= 0) {
      continue;
    }

    // this type matches anything
    if (isTSAnyKeyword(node)) {
      return [node];
    }

    // Analogue of FlowBaseAnnotation
    if (isTSBaseType(node)) {
      bases[node.type] = node;
      continue;
    }

    if (isTSUnionType(node)) {
      if (!typeGroups.has(node.types)) {
        nodes.push(...node.types);
        typeGroups.add(node.types);
      }
      continue;
    }

    // TODO: add generic types

    types.push(node);
  }

  // add back in bases
  for (const type of Object.keys(bases)) {
    types.push(bases[type]);
  }

  // add back in generics
  for (const name of Object.keys(generics)) {
    types.push(generics[name]);
  }

  return types;
}
