// @flow
import isPlainObject from "lodash/isPlainObject";
import isRegExp from "lodash/isRegExp";
import isValidIdentifier from "../validators/isValidIdentifier";
import {
  identifier,
  booleanLiteral,
  nullLiteral,
  stringLiteral,
  numericLiteral,
  regExpLiteral,
  arrayExpression,
  objectProperty,
  objectExpression,
} from "../builders/generated";

export default function valueToNode(value: any): Object {
  // undefined
  if (value === undefined) {
    return identifier("undefined");
  }

  // boolean
  if (value === true || value === false) {
    return booleanLiteral(value);
  }

  // null
  if (value === null) {
    return nullLiteral();
  }

  // strings
  if (typeof value === "string") {
    return stringLiteral(value);
  }

  // numbers
  if (typeof value === "number") {
    return numericLiteral(value);
  }

  // regexes
  if (isRegExp(value)) {
    const pattern = value.source;
    const flags = value.toString().match(/\/([a-z]+|)$/)[1];
    return regExpLiteral(pattern, flags);
  }

  // array
  if (Array.isArray(value)) {
    return arrayExpression(value.map(valueToNode));
  }

  // object
  if (isPlainObject(value)) {
    const props = [];
    for (const key in value) {
      let nodeKey;
      if (isValidIdentifier(key)) {
        nodeKey = identifier(key);
      } else {
        nodeKey = stringLiteral(key);
      }
      props.push(objectProperty(nodeKey, valueToNode(value[key])));
    }
    return objectExpression(props);
  }

  throw new Error("don't know how to turn this value into a node");
}
