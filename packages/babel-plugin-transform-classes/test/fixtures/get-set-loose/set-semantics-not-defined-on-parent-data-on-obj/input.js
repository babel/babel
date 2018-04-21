"use strict";
class Base {
}

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
expect(obj.set()).toBe(3);
expect(Base.prototype.test).toBeUndefined();
expect(Obj.prototype.test).toBe(2);
expect(obj.test).toBe(3);
