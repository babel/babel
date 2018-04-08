"use strict";
const Base = {
};

const obj = {
  set() {
    return super.test = 3;
  },
};
Object.defineProperty(obj, 'test', {
  value: 2,
  writable: true,
  configurable: false,
  enumerable: true,
});
Object.setPrototypeOf(obj, Base);

assert.equal(obj.set(), 3);
assert.equal(Base.test, undefined);
assert.equal(obj.test, 3);

const desc = Object.getOwnPropertyDescriptor(obj, 'test');
assert.equal(desc.configurable, false);
assert.equal(desc.writable, true);
assert.equal(desc.enumerable, true);
