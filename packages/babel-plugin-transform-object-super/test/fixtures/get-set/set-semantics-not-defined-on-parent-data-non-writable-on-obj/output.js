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
  writable: false,
  configurable: true,
  enumerable: true
});
Object.setPrototypeOf(obj, Base);
expect(() => {
  obj.set();
}).toThrow(TypeError);
expect(Base.test).toBeUndefined();
expect(obj.test).toBe(2);
const desc = Object.getOwnPropertyDescriptor(obj, 'test');
expect(desc.configurable).toBe(true);
expect(desc.writable).toBe(false);
expect(desc.enumerable).toBe(true);
