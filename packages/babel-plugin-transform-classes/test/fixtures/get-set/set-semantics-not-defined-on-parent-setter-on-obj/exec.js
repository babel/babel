"use strict";
class Base {
}

let value = 2;
class Obj extends Base {
  set test(v) {
    value = v;
  }

  set() {
    return super.test = 3;
  }
}

const obj = new Obj();
assert.equal(obj.set(), 3);
assert.equal(Base.prototype.test, undefined);
assert.equal(Obj.prototype.test, undefined);
assert.equal(value, 2);
assert.equal(obj.test, 3);
