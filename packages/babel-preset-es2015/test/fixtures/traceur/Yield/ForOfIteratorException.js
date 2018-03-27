class Iterable {
  constructor() {
    this.returnCalled = false;
  }
  [Symbol.iterator]() {
    return {
      iterable: this,
      next(v) {
        throw "ex";
      },
      throw(e) {
        throw e;
      },
      return(v) {
        this.iterable.returnCalled = true;
      }
    }
  }
}

var iterable = new Iterable();
var i;
expect(() => {
  for (i of iterable) {
  }
}).toThrow("ex");
expect(iterable.returnCalled).toBe(false);
