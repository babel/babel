"use strict";
const Base = {
  set test(v) {
    throw new Error("not called");
  }
};

const obj = {
  test: 2,

  get() {
    return super.test;
  },
};
Object.setPrototypeOf(obj, Base);

assert.equal(obj.test, 2);
assert.equal(obj.get(), undefined);
