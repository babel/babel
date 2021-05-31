"use strict";
const Base = {
  test: 1,
};

const obj = {
  test: 2,

  get() {
    return super.test;
  },
};
Object.setPrototypeOf(obj, Base);

expect(obj.test).toBe(2);
expect(obj.get()).toBe(1);
