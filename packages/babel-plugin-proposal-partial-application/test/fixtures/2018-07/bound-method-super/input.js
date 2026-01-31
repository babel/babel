class Sign {
  constructor(sign) {
    this.sign = sign;
  }
  getSign() {
    return this.sign;
  }
}

class Partial extends Sign {
  constructor(sign) {
    super(sign);
    this.compare = this.compare(?, ?);
  }
  getSign() {
    return this.sign * 2;
  }
  compare(a, b) {
    if(a > b){
      return super.getSign();
    }
  }
}
