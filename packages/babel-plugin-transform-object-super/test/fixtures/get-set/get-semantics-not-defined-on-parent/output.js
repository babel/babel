"use strict";

var _obj;
const Base = {};
const obj = _obj = {
  test: 2,
  get() {
    return babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "test", this);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.test).toBe(2);
expect(obj.get()).toBeUndefined();
