"use strict";

var _obj;
const Hello = {
  toString: function () {
    return 'hello';
  }
};
const Outer = _obj = {
  constructor: function () {
    class Inner {
      [babelHelpers.superPropertyGetCall(_obj, "toString", this, 0, [])]() {
        return 'hello';
      }
    }
    return new Inner();
  }
};
Object.setPrototypeOf(Outer, Hello);
expect(Outer.constructor().hello()).toBe('hello');
