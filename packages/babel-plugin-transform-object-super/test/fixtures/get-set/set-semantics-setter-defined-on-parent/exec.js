"use strict";
let value = 1;
const Base = {
  set test(v) {
    value = v;
  }
};

const obj = {
  test: 2,

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

assert.equal(obj.set(), 3);
assert.equal(value, 3);
assert.equal(Base.test, undefined);
assert.equal(obj.test, 2);
