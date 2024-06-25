"use strict";

var _obj;
const Base = {};
const obj = _obj = {
  get test() {},
  set() {
    return babelHelpers.superPropSet(_obj, "test", 3, this, 1);
  }
};
Object.setPrototypeOf(obj, Base);
expect(() => {
  // this requires helpers to be in file (not external), so they
  // are in "strict" mode code.
  obj.set();
}).toThrow(TypeError);
expect(Base.test).toBeUndefined();
expect(obj.test).toBeUndefined();
