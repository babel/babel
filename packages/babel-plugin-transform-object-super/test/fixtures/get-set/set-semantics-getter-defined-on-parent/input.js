"use strict";
const Base = {
  get test() {
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

expect(() => {
  // this requires helpers to be in file (not external), so they
  // are in "strict" mode code.
  obj.set();
}).toThrow();
expect(Base.test).toBe(1);
expect(obj.test).toBe(2);
