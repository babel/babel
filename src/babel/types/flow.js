import * as t from "./index";

/**
 * Takes an array of `types` and flattens them, removing duplicates and
 * returns a `UnionTypeAnnotation` node containg them.
 */

export function createUnionTypeAnnotation(types) {
  var flattened  = removeTypeDuplicates(types);

  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return t.unionTypeAnnotation(flattened);
  }
}

export function removeTypeDuplicates(nodes) {
  var generics = {};
  var bases = {};

  var types = [];

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (!node) continue;

    // this type matches anything
    if (t.isAnyTypeAnnotation(node)) {
      return [node];
    }

    //
    if (t.isFlowBaseAnnotation(node)) {
      bases[node.type] = node;
      continue;
    }

    //
    if (t.isUnionTypeAnnotation(node)) {
      nodes = nodes.concat(node.types);
      continue;
    }

    // find a matching generic type and merge and deduplicate the type parameters
    if (t.isGenericTypeAnnotation(node)) {
      let name = node.id.name;

      if (generics[name]) {
        var existing = generics[name];
        if (existing.typeParameters) {
          if (node.typeParameters) {
            existing.typeParameters.params = removeTypeDuplicates(
              existing.typeParameters.params.concat(node.typeParameters.params)
            );
          }
        } else {
          existing = node.typeParameters;
        }
      } else {
        generics[name] = node;
      }

      continue;
    }

    types.push(node);
  }

  // add back in bases
  for (var type in bases) {
    types.push(bases[type]);
  }

  // add back in generics
  for (let name in generics) {
    types.push(generics[name]);
  }

  return types;
}
