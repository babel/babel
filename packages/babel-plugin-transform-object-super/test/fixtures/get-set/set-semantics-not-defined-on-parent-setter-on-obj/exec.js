"use strict";
const Base = {
};

let value = 2;
const obj = {
  set test(v) {
    value = v;
  },

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

expect(() => {
  obj.set();
}).toThrow();
expect(value).toBe(2);
expect(Base.test).toBeUndefined();
expect(obj.test).toBeUndefined();
