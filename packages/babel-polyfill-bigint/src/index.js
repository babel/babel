import _BigInt from "big-integer";

if (global._babelPolyfillBigInt) {
  throw new Error("only one instance of babel-polyfill-bigint is allowed");
}
global._babelPolyfillBigInt = true;

class BigInt {
  constructor(num) {
    this.num = new _BigInt(num);
  }

  toString() {
    return this.num.toString();
  }
}

global.BigInt = BigInt;
