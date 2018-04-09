"use strict";
const Base = {
};

let value = 2;
const obj = {
  set test(v) {
    value = v;
  },

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

assert.throws(() => {
  obj.set();
});
assert.equal(value, 2);
assert.equal(Base.test, undefined);
assert.equal(obj.test, undefined);
