class Partial {
  constructor() {
    this.compare = this.compare(?, ?);
  }
  compare(a, b) {
    if(a > b){
      return a;
    }
  }
}

const foo = new Partial;

expect(foo.compare(3,1)).toEqual(3);
expect(foo.compare.length).toEqual(2);
expect(foo.compare.name).toEqual("compare");
