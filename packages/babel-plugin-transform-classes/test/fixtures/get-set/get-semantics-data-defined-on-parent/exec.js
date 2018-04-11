"use strict";
class Base {
}
Object.defineProperty(Base.prototype, 'test', {
  value: 1,
  writable: true,
  configurable: true,
});

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
