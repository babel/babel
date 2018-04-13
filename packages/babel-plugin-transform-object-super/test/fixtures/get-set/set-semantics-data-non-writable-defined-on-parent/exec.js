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

expect(() => {
  obj.set();
}).toThrow();
expect(Base.test).toBe(1);
expect(obj.test).toBe(2);
