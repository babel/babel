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
      [babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "toString", this).call(this)]() {
        return 'hello';
      }

    }

    return new Inner();
  }
};
Object.setPrototypeOf(Outer, Hello);
expect(Outer.constructor().hello()).toBe('hello');
