"use strict";
const Base = {
  set test(v) {
    throw new Error("not called");
  }
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
