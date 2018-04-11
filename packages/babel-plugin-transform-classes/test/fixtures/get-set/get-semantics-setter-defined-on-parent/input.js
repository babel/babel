"use strict";
class Base {
  set test(v) {
    throw new Error("not called");
  }
}

class Obj extends Base {
  get() {
    return super.test;
  }
}
Object.defineProperty(Obj.prototype, 'test', {
  value: 2,
  writable: true,
  configurable: true,
});

const obj = new Obj();
assert.equal(obj.test, 2);
assert.equal(obj.get(), undefined);
