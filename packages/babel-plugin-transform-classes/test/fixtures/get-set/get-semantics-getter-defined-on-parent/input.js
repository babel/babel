"use strict";
class Base {
  get test() {
    assert.equal(this, obj);
    return 1;
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
assert.equal(obj.get(), 1);
