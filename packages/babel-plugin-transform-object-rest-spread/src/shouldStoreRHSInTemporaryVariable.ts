import type { types as t } from "@babel/core";

/**
 * This is a helper function to determine if we should create an intermediate variable
 * such that the RHS of an assignment is not duplicated.
 *
 * See https://github.com/babel/babel/pull/13711#issuecomment-914388382 for discussion
 * on further optimizations.
 */
export default function shouldStoreRHSInTemporaryVariable(
  node: t.LVal,
): boolean {
  if (!node) return false;
  if (node.type === "ArrayPattern") {
    const nonNullElements = node.elements.filter(element => element !== null);
    if (nonNullElements.length > 1) return true;
    else return shouldStoreRHSInTemporaryVariable(nonNullElements[0]);
  } else if (node.type === "ObjectPattern") {
    const { properties } = node;
    if (properties.length > 1) return true;
    else if (properties.length === 0) return false;
    else {
      const firstProperty = properties[0];
      if (firstProperty.type === "ObjectProperty") {
        // the value of the property must be an LVal
        return shouldStoreRHSInTemporaryVariable(firstProperty.value as t.LVal);
      } else {
        return shouldStoreRHSInTemporaryVariable(firstProperty);
      }
    }
  } else if (node.type === "AssignmentPattern") {
    return shouldStoreRHSInTemporaryVariable(node.left);
  } else if (node.type === "RestElement") {
    if (node.argument.type === "Identifier") return true;
    return shouldStoreRHSInTemporaryVariable(node.argument);
  } else {
    // node is Identifier or MemberExpression
    return false;
  }
}
