"use strict";
class Base {
}

let called = false;
class Obj extends Base {
  get test() {
    called = true;
  }

  set() {
    return super.test = 3;
  }
}

const obj = new Obj();
assert.equal(obj.set(), 3);
assert.equal(called, false);
assert.equal(Base.prototype.test, undefined);
assert.equal(Obj.prototype.test, undefined);
assert.equal(obj.test, 3);
