"use strict";
const Base = {
};
Object.defineProperty(Base, 'test', {
  value: 1,
  writable: false,
  configurable: true,
});

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
assert.equal(Base.test, 1);
assert.equal(obj.test, 2);
