"use strict";
class Base {
  get test() {
    // This is incorrect according to the spec,
    // but close enough for loose.
    expect(this).toBe(Base.prototype);
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
expect(obj.test).toBe(2);
expect(obj.get()).toBe(1);
