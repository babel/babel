"use strict";
const Base = {
};

const obj = {
  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

expect(obj.set()).toBe(3);
expect(Base.test).toBeUndefined();
expect(obj.test).toBe(3);
