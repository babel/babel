"use strict";

var _obj;

const Base = {};
const obj = _obj = {
  set() {
    return babelHelpers.set(babelHelpers.getPrototypeOf(_obj), "test", 3, this, true);
  }

};
Object.defineProperty(obj, 'test', {
  value: 2,
  writable: true,
  configurable: false,
  enumerable: true
});
Object.setPrototypeOf(obj, Base);
expect(obj.set()).toBe(3);
expect(Base.test).toBeUndefined();
expect(obj.test).toBe(3);
const desc = Object.getOwnPropertyDescriptor(obj, 'test');
expect(desc.configurable).toBe(false);
expect(desc.writable).toBe(true);
expect(desc.enumerable).toBe(true);
