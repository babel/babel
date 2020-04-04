import {
  isTSAnyKeyword,
  isTSUnionType,
  isTSTypeParameter,
} from "../../validators/generated";

/**
 * Dedupe type annotations.
 */
export default function removeTypeDuplicates(
  nodes: Array<Object>,
): Array<Object> {
  const generics = {};
  // FIXME: I don't understand the purpose of bases for Flow (if it has an analogue for TS)
  // const bases = {};

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

    if (isTSAnyKeyword(node)) {
      return [node];
    }

    // FIXME: I don't understand the purpose of bases for Flow (if it has an analogue for TS)
    // if (isFlowBaseAnnotation(node)) {
    //   bases[node.type] = node;
    //   continue;
    // }

    if (isTSUnionType(node)) {
      if (typeGroups.indexOf(node.types) < 0) {
        nodes = nodes.concat(node.types);
        typeGroups.push(node.types);
      }
      continue;
    }

    if (isTSTypeParameter(node)) {
      const name = node.name;

      if (!generics[name]) {
        generics[name] = node;
      }

      continue;
    }

    types.push(node);
  }

  // FIXME: I don't understand the purpose of bases for Flow (if it has an analogue for TS)
  // add back in bases
  // for (const type of Object.keys(bases)) {
  //   types.push(bases[type]);
  // }

  // add back in generics
  for (const name of Object.keys(generics)) {
    types.push(generics[name]);
  }

  return types;
}
