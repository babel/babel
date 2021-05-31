"use strict";
class Base {
}

class Obj extends Base {
  call() {
    return super.test();
  }

  test() {
    throw new Error("gobbledygook");
  }
}

const obj = new Obj();
expect(() => {
  obj.call();

  // Asser that this throws, but that it's not
  // Obj.p.test's error that is thrown
}).toThrowError(TypeError)
