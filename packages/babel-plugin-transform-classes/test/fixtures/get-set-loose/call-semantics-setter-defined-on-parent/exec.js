"use strict";
class Base {
  set test(v) {
    throw new Error("gobbledygook");
  }
}

class Obj extends Base {
  call() {
    return super.test();
  }
}
Object.defineProperty(Obj.prototype, 'test', {
  writable: true,
  configurable: true,
  value() {
    throw new Error("gobbledygook");
  }
});

const obj = new Obj();
expect(() => {
  obj.call();

  // Asser that this throws, but that it's not
  // a gobbledygook error that is thrown
}).toThrowError(TypeError)
