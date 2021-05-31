"use strict";
const Base = {
};
Object.defineProperty(Base, 'test', {
  value: 1,
  writable: true,
  configurable: false,
});

const obj = {
  test: 2,

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

expect(obj.set()).toBe(3);
expect(Base.test).toBe(1);
expect(obj.test).toBe(3);
