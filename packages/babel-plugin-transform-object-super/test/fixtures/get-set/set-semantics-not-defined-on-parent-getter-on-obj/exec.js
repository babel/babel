"use strict";
const Base = {
};

let called = false;
const obj = {
  get test() {
    called = true;
  },

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

expect(() => {
  obj.set();
}).toThrow(TypeError);
expect(called).toBe(false);
expect(Base.test).toBeUndefined();
expect(obj.test).toBeUndefined();
