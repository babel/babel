import {
  isAnyTypeAnnotation,
  isGenericTypeAnnotation,
  isUnionTypeAnnotation,
  isFlowBaseAnnotation,
  isIdentifier,
} from "../../validators/generated";
import type * as t from "../..";

function getQualifiedName(node: t.GenericTypeAnnotation["id"]) {
  return isIdentifier(node)
    ? node.name
    : `${node.id.name}.${getQualifiedName(node.qualification)}`;
}

/**
 * Dedupe type annotations.
 */
export default function removeTypeDuplicates(
  // todo(babel-8): change type to Array<...>
  nodes: ReadonlyArray<t.FlowType | false | null | undefined>,
): t.FlowType[] {
  const generics = {};
  const bases = {};

  // store union type groups to circular references
  const typeGroups = new Set<t.FlowType[]>();

  const types = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!node) continue;

    // detect duplicates
    if (types.indexOf(node) >= 0) {
      continue;
    }

    // this type matches anything
    if (isAnyTypeAnnotation(node)) {
      return [node];
    }

    if (isFlowBaseAnnotation(node)) {
      bases[node.type] = node;
      continue;
    }

    if (isUnionTypeAnnotation(node)) {
      if (!typeGroups.has(node.types)) {
        // todo(babel-8): use .push when nodes is mutable
        nodes = nodes.concat(node.types);
        typeGroups.add(node.types);
      }
      continue;
    }

    // find a matching generic type and merge and deduplicate the type parameters
    if (isGenericTypeAnnotation(node)) {
      const name = getQualifiedName(node.id);

      if (generics[name]) {
        let existing = generics[name];
        if (existing.typeParameters) {
          if (node.typeParameters) {
            existing.typeParameters.params = removeTypeDuplicates(
              existing.typeParameters.params.concat(node.typeParameters.params),
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
  for (const type of Object.keys(bases)) {
    types.push(bases[type]);
  }

  // add back in generics
  for (const name of Object.keys(generics)) {
    types.push(generics[name]);
  }

  return types;
}
