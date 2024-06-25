"use strict";

var _obj;
const Base = {};
const obj = _obj = {
  set() {
    return babelHelpers.superPropSet(_obj, "test", 3, this, 1);
  }
};
Object.setPrototypeOf(obj, Base);
expect(obj.set()).toBe(3);
expect(Base.test).toBeUndefined();
expect(obj.test).toBe(3);
