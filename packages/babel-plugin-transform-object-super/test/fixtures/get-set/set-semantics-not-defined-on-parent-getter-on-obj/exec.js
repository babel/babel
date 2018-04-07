"use strict";
const Base = {
};

const obj = {
  get test() { },

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
assert.equal(Base.test, undefined);
assert.equal(obj.test, undefined);
