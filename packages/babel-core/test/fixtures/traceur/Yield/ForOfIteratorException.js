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
assert.throws(() => {
  for (i of iterable) {
  }
}, "ex");
assert.isFalse(iterable.returnCalled);
