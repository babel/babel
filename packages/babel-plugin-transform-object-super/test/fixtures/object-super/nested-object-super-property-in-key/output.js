"use strict";

var _obj;

const Hello = {
  toString: function () {
    return 'hello';
  }
};
const Outer = _obj = {
  constructor: function () {
    var _thisSuper;

    const Inner = {
      [babelHelpers.get((_thisSuper = this, babelHelpers.getPrototypeOf(_obj)), "toString", _thisSuper).call(_thisSuper)]: function () {
        return 'hello';
      }
    };
    return Inner;
  }
};
Object.setPrototypeOf(Outer, Hello);
expect(Outer.constructor().hello()).toBe('hello');
