"use strict";
const Base = {
  get test() {
    assert.equal(this, obj);
    return 1;
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
assert.equal(obj.get(), 1);
