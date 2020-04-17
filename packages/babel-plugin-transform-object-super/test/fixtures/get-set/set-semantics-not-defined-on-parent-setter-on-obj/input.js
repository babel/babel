"use strict";
const Base = {
};

let value = 2;
const obj = {
  set test(v) {
    expect(this).toBe(obj);
    value = v;
  },

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

expect(obj.set()).toBe(3);
expect(Base.test).toBeUndefined();
expect(value).toBe(3);
expect(obj.test).toBeUndefined();
