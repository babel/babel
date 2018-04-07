"use strict";
const Base = {
  get test() {
    return 1;
  }
};

const obj = {
  test: 2,

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

assert.throws(() => {
  // this requires helpers to be in file (not external), so they
  // are in "strict" mode code.
  obj.set();
});
assert.equal(Base.test, 1);
assert.equal(obj.test, 2);
