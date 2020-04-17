"use strict";
let value = 1;
const Base = {
  set test(v) {
    value = v;
  }
};

const obj = {
  test: 2,

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

expect(obj.set()).toBe(3);
expect(value).toBe(3);
expect(Base.test).toBeUndefined();
expect(obj.test).toBe(2);
