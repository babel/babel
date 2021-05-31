"use strict";
let value = 1;
class Base {
  set test(v) {
    value = v;
  }
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
// todo
expect(value).toBe(1);
expect(Base.prototype.test).toBeUndefined();
expect(Obj.prototype.test).toBe(2);
// todo
expect(obj.test).toBe(3);
