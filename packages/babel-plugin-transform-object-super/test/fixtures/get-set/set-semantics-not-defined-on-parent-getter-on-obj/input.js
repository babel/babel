"use strict";
const Base = {
};

const obj = {
  get test() { },

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
expect(Base.test).toBeUndefined();
expect(obj.test).toBeUndefined();
