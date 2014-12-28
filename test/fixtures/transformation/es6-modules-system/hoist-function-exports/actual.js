import { isEven } from "./evens";

export function nextOdd(n) {
  return p = isEven(n) ? n + 1 : n + 2;
}

export var p = 5;

export var isOdd = (function (isEven) {
  return function (n) {
    return !isEven(n);
  };
})(isEven);
