"use strict";
const Base = {
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
