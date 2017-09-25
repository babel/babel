// import isNumber from "lodash/isNumber";
import isString from "lodash/isString";

function isBigInt(x) {
  return x instanceof global.BigInt;
}

function BigIntUnaryMinus(left) {
  return BigIntMultiply(new global.BigInt("-1"), left);
}

function BigIntExp(left, right) {
  return new global.BigInt(left.num.pow(right.num).toString());
}

function BigIntMultiply(left, right) {
  return new global.BigInt(left.num.times(right.num).toString());
}

function BigIntDivide(left, right) {
  if (left.toString() === "0") {
    throw new RangeError();
  }
  return new global.BigInt(left.num.divide(right.num).toString());
}

function BigIntRemainder(left, right) {
  if (left.toString() === "0") {
    throw new RangeError();
  }
  return new global.BigInt(left.num.mod(right.num).toString());
}

function BigIntAdd(left, right) {
  return new global.BigInt(left.num.plus(right.num).toString());
}

function BigIntSubtract(left, right) {
  return new global.BigInt(left.num.minus(right.num).toString());
}

function BigIntLeftShift(left, right) {
  // TODO: ask if lib's limit of value of right to [-9007199254740992, 9007199254740992]
  // is ok
  return new global.BigInt(left.num.shiftLeft(right.num).toString());
}

function BigIntSignedRightShift(left, right) {
  return BigIntLeftShift(left, BigIntUnaryMinus(right));
}

function BigIntUnSignedRightShift() {
  throw new TypeError();
}

function BigIntBitwiseOR(left, right) {
  return new global.BigInt(left.num.or(right.num).toString());
}

function BigIntBitwiseAND(left, right) {
  return new global.BigInt(left.num.and(right.num).toString());
}

function BigIntBitwiseXOR(left, right) {
  return new global.BigInt(left.num.xor(right.num).toString());
}

function checkTypesMatch(left, right, operator) {
  if (
    (isBigInt(left) && !isBigInt(right)) ||
    (!isBigInt(left) && isBigInt(right))
  ) {
    throw new TypeError(`Cannot perform ${operator} on a BigInt and a Number`);
  }
}

export function checkUnaryExpressions(operator, argument) {
  if (operator === "-") {
    if (isBigInt(argument)) {
      return BigIntUnaryMinus(argument);
    } else {
      return -argument;
    }
  } else if (operator === "typeof") {
    // TODO
  } else if (operator === "~") {
    return BigIntSubtract(BigIntUnaryMinus(argument), 1);
  }
}

export default function(left, right, operator) {
  // TODO: DRY this up a bit, if that's desirable
  if (operator === "**") {
    checkTypesMatch(left, right, operator);
    if (isBigInt(left)) {
      return BigIntExp(left, right);
    } else {
      return left ** right;
    }
  } else if (operator === "*") {
    checkTypesMatch(left, right, operator);
    if (isBigInt(left)) {
      return BigIntMultiply(left, right);
    } else {
      return left * right;
    }
  } else if (operator === "/") {
    checkTypesMatch(left, right, operator);
    if (isBigInt(left)) {
      return BigIntDivide(left, right);
    } else {
      return left / right;
    }
  } else if (operator === "%") {
    checkTypesMatch(left, right, operator);
    if (isBigInt(left)) {
      return BigIntRemainder(left, right);
    } else {
      return left % right;
    }
  } else if (operator === "+") {
    if (isString(left) || isString(right)) {
      return left + right;
    }

    checkTypesMatch(left, right, operator);

    if (isBigInt(left)) {
      return BigIntAdd(left, right);
    } else {
      return left + right;
    }
  } else if (operator === "-") {
    checkTypesMatch(left, right, operator);

    if (isBigInt(left)) {
      return BigIntSubtract(left, right);
    } else {
      return left - right;
    }
  } else if (operator === "<<") {
    checkTypesMatch(left, right, operator);

    if (isBigInt(left)) {
      return BigIntLeftShift(left, right);
    } else {
      return left << right;
    }
  } else if (operator === ">>") {
    checkTypesMatch(left, right, operator);

    if (isBigInt(left)) {
      return BigIntSignedRightShift(left, right);
    } else {
      return left >> right;
    }
  } else if (operator === ">>>") {
    checkTypesMatch(left, right, operator);

    if (isBigInt(left)) {
      return BigIntUnSignedRightShift(left, right);
    } else {
      return left >>> right;
    }
  } else if (operator === "|") {
    checkTypesMatch(left, right, operator);

    if (isBigInt(left)) {
      return BigIntBitwiseOR(left, right);
    } else {
      return left | right;
    }
  } else if (operator === "&") {
    checkTypesMatch(left, right, operator);

    if (isBigInt(left)) {
      return BigIntBitwiseAND(left, right);
    } else {
      return left & right;
    }
  } else if (operator === "^") {
    checkTypesMatch(left, right, operator);

    if (isBigInt(left)) {
      return BigIntBitwiseXOR(left, right);
    } else {
      return left ^ right;
    }
  }
}
