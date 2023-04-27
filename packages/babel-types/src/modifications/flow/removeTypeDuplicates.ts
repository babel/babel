import {
  isAnyTypeAnnotation,
  isGenericTypeAnnotation,
  isUnionTypeAnnotation,
  isFlowBaseAnnotation,
  isIdentifier,
} from "../../validators/generated";
import type * as t from "../..";

function getQualifiedName(node: t.GenericTypeAnnotation["id"]): string {
  return isIdentifier(node)
    ? node.name
    : `${node.id.name}.${getQualifiedName(node.qualification)}`;
}

/**
 * Dedupe type annotations.
 */
export default function removeTypeDuplicates(
  nodesIn: ReadonlyArray<t.FlowType | false | null | undefined>,
): t.FlowType[] {
  const nodes = Array.from(nodesIn);

  const generics = new Map<string, t.GenericTypeAnnotation>();
  const bases = new Map<t.FlowBaseAnnotation["type"], t.FlowBaseAnnotation>();

  // store union type groups to circular references
  const typeGroups = new Set<t.FlowType[]>();

  const types: t.FlowType[] = [];

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
      bases.set(node.type, node);
      continue;
    }

    if (isUnionTypeAnnotation(node)) {
      if (!typeGroups.has(node.types)) {
        nodes.push(...node.types);
        typeGroups.add(node.types);
      }
      continue;
    }

    // find a matching generic type and merge and deduplicate the type parameters
    if (isGenericTypeAnnotation(node)) {
      const name = getQualifiedName(node.id);

      if (generics.has(name)) {
        let existing: t.Flow = generics.get(name);
        if (existing.typeParameters) {
          if (node.typeParameters) {
            existing.typeParameters.params.push(...node.typeParameters.params);
            existing.typeParameters.params = removeTypeDuplicates(
              existing.typeParameters.params,
            );
          }
        } else {
          existing = node.typeParameters;
        }
      } else {
        generics.set(name, node);
      }

      continue;
    }

    types.push(node);
  }

  // add back in bases
  for (const [, baseType] of bases) {
    types.push(baseType);
  }

  // add back in generics
  for (const [, genericName] of generics) {
    types.push(genericName);
  }

  return types;
}
