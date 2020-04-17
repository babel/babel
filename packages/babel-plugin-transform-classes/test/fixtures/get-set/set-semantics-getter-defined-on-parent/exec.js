"use strict";
let called = false;
class Base {
  get test() {
    called = true;
    return 1;
  }
};

class Obj extends Base {
  set() {
    return super.test = 3;
  }
}
Object.defineProperty(Obj.prototype, 'test', {
  value: 2,
  writable: true,
  configurable: true,
});

const obj = new Obj();
expect(() => {
  obj.set();
}).toThrow();
expect(called).toBe(false);
expect(Base.prototype.test).toBe(1);
expect(Obj.prototype.test).toBe(2);
expect(obj.test).toBe(2);
