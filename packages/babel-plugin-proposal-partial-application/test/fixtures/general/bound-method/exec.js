class Partial {
  constructor(sign) {
    this.sign = sign;
    this.compare = this.compare(?, ?);
  }
  compare(a, b) {
    if(a > b){
      return this.sign;
    }
  }
}

const foo = new Partial(1);
const bar = new Partial(-1);

expect(foo.compare(3,1)).toEqual(1);
expect(foo.compare.length).toEqual(2);
expect(foo.compare.name).toEqual("compare");

expect(bar.compare(3,1)).toEqual(-1);

expect(foo.compare.call(bar, 3, 1)).toEqual(1);
expect(bar.compare.call(foo, 3, 1)).toEqual(-1);
