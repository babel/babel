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
assert.equal(obj.set(), 3);
assert.equal(value, 3);
assert.equal(Base.prototype.test, undefined);
assert.equal(Obj.prototype.test, 2);
assert.equal(obj.test, 2);
