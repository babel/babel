import BigNumber from "bignumber.js";

class BigInt {
  constructor(num) {
    this.num = new BigNumber(num);
  }

  plus(other_num) {
    return new BigInt(this.num.plus(other_num).toString());
  }

  toString() {
    return this.num.toString();
  }
}

global.BigInt = BigInt;
