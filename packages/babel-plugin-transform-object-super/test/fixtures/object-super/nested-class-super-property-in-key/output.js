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
      [babelHelpers.superPropGet(_obj, "toString", this, 2)([])]() {
        return 'hello';
      }
    }
    return new Inner();
  }
};
Object.setPrototypeOf(Outer, Hello);
expect(Outer.constructor().hello()).toBe('hello');
