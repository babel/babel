"use strict";
const Base = {
};

const obj = {
  test: 2,

  get() {
    return super.test;
  },
};
Object.setPrototypeOf(obj, Base);

expect(obj.test).toBe(2);
expect(obj.get()).toBeUndefined();
