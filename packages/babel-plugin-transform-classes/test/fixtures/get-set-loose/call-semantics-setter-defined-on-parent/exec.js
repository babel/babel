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

  // TODO: After #7772, we can define this normally
  // test() {
    // throw new Error("called");
  // }
}
Object.defineProperty(Obj.prototype, "test", {
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
