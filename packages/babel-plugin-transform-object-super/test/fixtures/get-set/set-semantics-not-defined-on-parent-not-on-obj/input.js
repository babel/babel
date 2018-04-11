"use strict";
const Base = {
};

const obj = {
  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

assert.equal(obj.set(), 3);
assert.equal(Base.test, undefined);
assert.equal(obj.test, 3);
