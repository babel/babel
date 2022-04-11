"use strict";
let called = false;
const Base = {
  get test() {
    called = true;
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
  obj.set();
}).toThrow();
expect(called).toBe(false);
expect(Base.test).toBe(1);
expect(obj.test).toBe(2);
