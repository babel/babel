import isNumber from "lodash/isNumber";
import isString from "lodash/isString";

function isBigInt(x) {
  return x instanceof global.BigInt;
}

export default function(left, right, operator) {
  // TODO: don't throw for operations that can be performed on BigInt and Number (i.e. comparisons)
  if (
    (isBigInt(left) && isNumber(right)) ||
    (isNumber(left) && isBigInt(right))
  ) {
    throw new TypeError(`Cannot perform ${operator} on a BigInt and a Number`);
  }

  if (isString(left) || isString(right)) {
    return left.toString() + right.toString();
  }

  if (isBigInt(left) && isBigInt(right)) {
    return left.plus(right);
  } else {
    return left + right;
  }
}
