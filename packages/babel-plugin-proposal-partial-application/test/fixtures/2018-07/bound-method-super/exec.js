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
    this.boundCompare = this.compare(?, ?);
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

const foo = new Partial(1);
const bar = new Partial(-1);

expect(foo.boundCompare(3,1)).toEqual(1);
expect(foo.boundCompare.length).toEqual(2);
expect(foo.boundCompare.name).toEqual("compare");

expect(bar.boundCompare(3,1)).toEqual(-1);

expect(foo.boundCompare.call(bar, 3, 1)).toEqual(1);
expect(bar.boundCompare.call(foo, 3, 1)).toEqual(-1);

expect(foo.compare.call(bar, 3, 1)).toEqual(-1);
expect(bar.compare.call(foo, 3, 1)).toEqual(1);
