"use strict";

var _obj;
const Base = {
  get test() {
    return 1;
  }
};
const obj = _obj = {
  test: 2,
  set() {
    return babelHelpers.set(babelHelpers.getPrototypeOf(_obj), "test", 3, this, true);
  }
};
Object.setPrototypeOf(obj, Base);
expect(() => {
  // this requires helpers to be in file (not external), so they
  // are in "strict" mode code.
  obj.set();
}).toThrow(TypeError);
expect(Base.test).toBe(1);
expect(obj.test).toBe(2);
