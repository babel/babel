import {
  isTSAnyKeyword,
  isTSUnionType,
  isTSBooleanKeyword,
  isTSBigIntKeyword,
  isTSNeverKeyword,
  isTSNullKeyword,
  isTSNumberKeyword,
  isTSObjectKeyword,
  isTSStringKeyword,
  isTSUnknownKeyword,
  isTSVoidKeyword,
  isTSUndefinedKeyword,
  isTSLiteralType,
  isTSThisType,
} from "../../validators/generated";

/**
 * Dedupe type annotations.
 */
export default function removeTypeDuplicates(
  nodes: Array<Object>,
): Array<Object> {
  const generics = {};
  const bases = {};

  // store union type groups to circular references
  const typeGroups = [];

  const types = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!node) continue;

    // detect duplicates
    if (types.indexOf(node) >= 0) {
      continue;
    }

    // this type matches anything
    if (isTSAnyKeyword(node.type)) {
      return [node];
    }

    // Basic TS types, analogue of FlowBaseAnnotation
    if (
      isTSBooleanKeyword(node) ||
      isTSBigIntKeyword(node) ||
      isTSNeverKeyword(node) ||
      isTSNullKeyword(node) ||
      isTSNumberKeyword(node) ||
      isTSObjectKeyword(node) ||
      isTSStringKeyword(node) ||
      isTSUndefinedKeyword(node) ||
      isTSUnknownKeyword(node) ||
      isTSVoidKeyword(node) ||
      isTSThisType(node) ||
      isTSLiteralType(node)
    ) {
      bases[node.type] = node;
      continue;
    }

    if (isTSUnionType(node)) {
      if (typeGroups.indexOf(node.types) < 0) {
        nodes = nodes.concat(node.types);
        typeGroups.push(node.types);
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
