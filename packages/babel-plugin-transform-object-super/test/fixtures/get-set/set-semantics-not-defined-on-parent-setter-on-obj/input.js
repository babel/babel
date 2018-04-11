"use strict";
const Base = {
};

let value = 2;
const obj = {
  set test(v) {
    assert.equal(this, obj);
    value = v;
  },

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

assert.equal(obj.set(), 3);
assert.equal(Base.test, undefined);
assert.equal(value, 3);
assert.equal(obj.test, undefined);
