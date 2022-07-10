/* eslint-disable no-confusing-arrow */

import { isIdentifierName } from "@babel/helper-validator-identifier";

const { isArray } = Array;
const { isInteger } = Number;
const { hasOwnProperty } = Object;

export default class Difference {
  constructor(adjust, expected, actual) {
    const woundDifference = compare(adjust, expected, actual);

    if (!woundDifference) {
      return Difference.None;
    }

    const [path, reason] = toUnwoundDifference(woundDifference);
    const message = `${toExplanationString(reason)} in ${toPathString(path)}`;

    return Object.assign(this, { ...reason, path, message });
  }
}

Difference.None = Object.freeze(
  Object.setPrototypeOf({}, Difference.prototype),
);

const toType = value =>
  value === null
    ? "null"
    : typeof value !== "object"
    ? typeof value
    : isArray(value)
    ? "Array"
    : value instanceof RegExp
    ? "RegExp"
    : value instanceof Error
    ? "Error"
    : "Object";

function compare(adjust, expected, actual) {
  // easy.
  if (Object.is(expected, actual)) {
    return false;
  }

  const typeExpected = toType(expected);
  const typeActual = toType(actual);

  if (typeExpected !== typeActual) {
    return { discrepancy: "value", expected, actual };
  }

  // Just ignore functions (AKA, assume they're equal).
  if (typeActual === "function") {
    return false;
  }

  if (typeActual === "RegExp" && expected + "" === actual + "") {
    return false;
  }

  if (typeActual === "Error") {
    return compare(
      adjust,
      { message: expected.message },
      { message: actual.message },
    );
  }

  if (typeActual !== "Object" && typeActual !== "Array") {
    return { discrepancy: "value", expected, actual };
  }

  const keysExpected = Object.keys(expected);
  const keysActual = Object.keys(actual).filter(
    key => actual[key] !== void 0 && typeof actual[key] !== "function",
  );
  const lengthExpected = keysExpected.length;
  const lengthActual = keysActual.length;

  if (lengthExpected !== lengthActual && typeActual === "Array") {
    return {
      discrepancy: "length",
      expected: lengthExpected,
      actual: lengthActual,
    };
  }

  if (lengthExpected < lengthActual) {
    const keysExpectedSet = new Set(keysExpected);
    const key = keysActual.find(key => !keysExpectedSet.has(key));

    if (key !== void 0) {
      return { discrepancy: "unexpected-key", key };
    }
  }

  for (const key of keysExpected) {
    if (!hasOwnProperty.call(actual, key)) {
      return { discrepancy: "missing-key", key, actual };
    }

    const original = expected[key];
    const adjusted = adjust
      ? adjust(adjust, original, key, expected)
      : original;
    const difference = compare(adjust, adjusted, actual[key]);

    if (difference) {
      return [key, difference];
    }
  }

  return false;
}

const toUnwoundDifference = compiled =>
  !isArray(compiled)
    ? [[], compiled]
    : toUnwoundDifference(compiled[1]).map((item, index) =>
        index === 0 ? [compiled[0], ...item] : item,
      );

const toValueString = (value, type = toType(value)) =>
  type === "string"
    ? JSON.stringify(value)
    : type === "symbol"
    ? value.toString()
    : type === "bigint"
    ? `${value}n`
    : Object.is(value, -0)
    ? "-0"
    : value + "";

const toExplanationString = ({ discrepancy, expected, actual, key }) =>
  discrepancy === "length"
    ? `Array of wrong size, expected length of ${expected}, but got ${actual}`
    : discrepancy === "unexpected-key"
    ? `Did not expect a property ${toValueString(key)}`
    : discrepancy === "missing-key"
    ? `${toType(actual)} is missing property ${toValueString(key)}`
    : `${toValueString(expected)} != ${toValueString(actual)}`;

const isInt = key => isInteger(+key);
const toAccess = key =>
  isInt(key) ? `[${key}]` : isIdentifierName(key) ? `.${key}` : `["${key}"]`;

const toPathString = path => path.map(toAccess).join("");
