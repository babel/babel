"use strict";
let called = false;
const Base = {
  get test() {
    called = true;
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
  obj.set();
});
assert.equal(called, false);
assert.equal(Base.test, 1);
assert.equal(obj.test, 2);
