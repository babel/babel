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
assert.throws(() => {
  obj.set();
});
assert.equal(called, false);
assert.equal(Base.prototype.test, 1);
assert.equal(Obj.prototype.test, 2);
assert.equal(obj.test, 2);
