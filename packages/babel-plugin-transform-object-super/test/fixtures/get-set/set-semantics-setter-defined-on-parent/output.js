"use strict";

var _obj;
let value = 1;
const Base = {
  set test(v) {
    value = v;
  }
};
const obj = _obj = {
  test: 2,
  set() {
    return babelHelpers.superPropSet(_obj, "test", 3, this, 1);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.set()).toBe(3);
expect(value).toBe(3);
expect(Base.test).toBeUndefined();
expect(obj.test).toBe(2);
