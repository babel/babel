"use strict";

var _obj;
const Base = {};
let value = 2;
const obj = _obj = {
  set test(v) {
    expect(this).toBe(obj);
    value = v;
  },
  set() {
    return babelHelpers.set(babelHelpers.getPrototypeOf(_obj), "test", 3, this, true);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.set()).toBe(3);
expect(Base.test).toBeUndefined();
expect(value).toBe(3);
expect(obj.test).toBeUndefined();
