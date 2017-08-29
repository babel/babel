import BigNumber from "bignumber.js";

class BigInt {
  constructor(num) {
    this.num = new BigNumber(num);
  }

  toString() {
    return this.num.toString();
  }
}

global.BigInt = BigInt;
