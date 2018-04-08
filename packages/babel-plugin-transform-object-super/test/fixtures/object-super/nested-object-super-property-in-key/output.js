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
      [babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "toString", this).call(this)]: function () {
        return 'hello';
      }
    };
    return Inner;
  }
};
Object.setPrototypeOf(Outer, Hello);
assert.equal(Outer.constructor().hello(), 'hello');
