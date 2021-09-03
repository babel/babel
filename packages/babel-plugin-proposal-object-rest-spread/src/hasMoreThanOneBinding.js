import { types as t } from "@babel/core";

export default function hasMoreThanOneBinding(node) {
  if (t.isArrayPattern(node)) {
    const nonNullElements = node.elements.filter(element => element !== null);
    if (nonNullElements.length > 1) return true;
    else return hasMoreThanOneBinding(nonNullElements[0]);
  } else if (t.isObjectPattern(node)) {
    if (node.properties.length > 1) return true;
    else if (node.properties.length === 0) return false;
    else return hasMoreThanOneBinding(node.properties[0]);
  } else if (t.isObjectProperty(node)) {
    return hasMoreThanOneBinding(node.value);
  } else if (t.isAssignmentPattern(node)) {
    return hasMoreThanOneBinding(node.left);
  } else if (t.isRestElement(node)) {
    if (t.isIdentifier(node.argument)) return true;
    return hasMoreThanOneBinding(node.argument);
  } else {
    // node is Identifier or MemberExpression
    return false;
  }
}
