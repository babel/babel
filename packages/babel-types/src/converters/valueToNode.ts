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
  unaryExpression,
  binaryExpression,
} from "../builders/generated";
import type * as types from "../types";

export default function valueToNode(value: undefined): types.Identifier; // (should this not be a types.UnaryExpression to avoid shadowing?)
export default function valueToNode(value: boolean): types.BooleanLiteral;
export default function valueToNode(value: null): types.NullLiteral;
export default function valueToNode(value: string): types.StringLiteral;
// Infinities and NaN need to use a types.BinaryExpression; negative values must be wrapped in types.UnaryExpression
export default function valueToNode(
  value: number,
): types.NumericLiteral | types.BinaryExpression | types.UnaryExpression;
export default function valueToNode(value: RegExp): types.RegExpLiteral;
export default function valueToNode(
  value: ReadonlyArray<
    undefined | boolean | null | string | number | RegExp | object
  >,
): types.ArrayExpression;
// this throws with objects that are not PlainObject according to lodash,
// or if there are non-valueToNode-able values
export default function valueToNode(value: object): types.ObjectExpression;

export default function valueToNode(
  value: undefined | boolean | null | string | number | RegExp | object,
): types.Expression;

export default function valueToNode(
  value: undefined | boolean | null | string | number | RegExp | object,
): types.Expression {
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
    let result;
    if (Number.isFinite(value)) {
      result = numericLiteral(Math.abs(value));
    } else {
      let numerator;
      if (Number.isNaN(value)) {
        // NaN
        numerator = numericLiteral(0);
      } else {
        // Infinity / -Infinity
        numerator = numericLiteral(1);
      }

      result = binaryExpression("/", numerator, numericLiteral(0));
    }

    if (value < 0 || Object.is(value, -0)) {
      result = unaryExpression("-", result);
    }

    return result;
  }

  // regexes
  if (isRegExp(value)) {
    // todo: add @types/lodash
    const pattern = (value as RegExp).source;
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
    for (const key of Object.keys(value)) {
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
