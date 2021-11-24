import { types as t } from "@babel/core";

const { isObjectProperty } = t;
/**
 * This is a helper function to determine if we should create an intermediate variable
 * such that the RHS of an assignment is not duplicated.
 *
 * See https://github.com/babel/babel/pull/13711#issuecomment-914388382 for discussion
 * on further optimizations.
 */
export default function shouldStoreRHSInTemporaryVariable(node: t.LVal) {
  if (t.isArrayPattern(node)) {
    const nonNullElements = node.elements.filter(element => element !== null);
    if (nonNullElements.length > 1) return true;
    else return shouldStoreRHSInTemporaryVariable(nonNullElements[0]);
  } else if (t.isObjectPattern(node)) {
    const { properties } = node;
    if (properties.length > 1) return true;
    else if (properties.length === 0) return false;
    else {
      const firstProperty = properties[0];
      if (isObjectProperty(firstProperty)) {
        // the value of the property must be an LVal
        return shouldStoreRHSInTemporaryVariable(firstProperty.value as t.LVal);
      } else {
        return shouldStoreRHSInTemporaryVariable(firstProperty);
      }
    }
  } else if (t.isAssignmentPattern(node)) {
    return shouldStoreRHSInTemporaryVariable(node.left);
  } else if (t.isRestElement(node)) {
    if (t.isIdentifier(node.argument)) return true;
    return shouldStoreRHSInTemporaryVariable(node.argument);
  } else {
    // node is Identifier or MemberExpression
    return false;
  }
}
