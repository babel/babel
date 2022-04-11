"use strict";
const Base = {
  test: 1,
};

const obj = {
  test: 2,

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

expect(obj.set()).toBe(3);
expect(Base.test).toBe(3);
expect(obj.test).toBe(2);
