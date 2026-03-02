"use strict";

var _obj;
const Hello = {
  toString: function () {
    return 'hello';
  }
};
const Outer = _obj = {
  constructor: function () {
    const Inner = {
      [babelHelpers.superPropGet(_obj, "toString", this, 2)([])]: function () {
        return 'hello';
      }
    };
    return Inner;
  }
};
Object.setPrototypeOf(Outer, Hello);
expect(Outer.constructor().hello()).toBe('hello');
