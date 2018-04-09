"use strict";
const Base = {
};

let called = false;
const obj = {
  get test() {
    called = true;
  },

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

assert.throws(() => {
  obj.set();
});
assert.equal(called, false);
assert.equal(Base.test, undefined);
assert.equal(obj.test, undefined);
