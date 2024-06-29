"use strict";

var _obj;
const Base = {
  get test() {
    expect(this).toBe(obj);
    return 1;
  }
};
const obj = _obj = {
  test: 2,
  get() {
    return babelHelpers.superPropGet(_obj, "test", this);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.test).toBe(2);
expect(obj.get()).toBe(1);
