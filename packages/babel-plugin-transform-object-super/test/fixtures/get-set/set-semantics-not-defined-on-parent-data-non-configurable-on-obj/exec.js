"use strict";
const Base = {
};

const obj = {
  set() {
    return super.test = 3;
  },
};
Object.defineProperty(obj, 'test', {
  value: 2,
  writable: true,
  configurable: false,
  enumerable: true,
});
Object.setPrototypeOf(obj, Base);

expect(obj.set()).toBe(3);
expect(Base.test).toBeUndefined();
expect(obj.test).toBe(3);

const desc = Object.getOwnPropertyDescriptor(obj, 'test');
expect(desc.configurable).toBe(false);
expect(desc.writable).toBe(true);
expect(desc.enumerable).toBe(true);
