"use strict";

var Test = (function (_Foo) {
  var _Test = function Test() {
    var _babelHelpers$get, _babelHelpers$get2;

    babelHelpers.classCallCheck(this, _Test);

    woops["super"].test();
    babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "constructor", this).call(this);
    babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "test", this).call(this);

    babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "constructor", this).apply(this, arguments);
    (_babelHelpers$get = babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "constructor", this)).call.apply(_babelHelpers$get, [this, "test"].concat(babelHelpers.slice.call(arguments)));

    babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "test", this).apply(this, arguments);
    (_babelHelpers$get2 = babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "test", this)).call.apply(_babelHelpers$get2, [this, "test"].concat(babelHelpers.slice.call(arguments)));
  };

  babelHelpers.inherits(_Test, _Foo);
  babelHelpers.createClass(_Test, {
    test: {
      value: function test() {
        var _babelHelpers$get;

        babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "test", this).call(this);
        babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "test", this).apply(this, arguments);
        (_babelHelpers$get = babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "test", this)).call.apply(_babelHelpers$get, [this, "test"].concat(babelHelpers.slice.call(arguments)));
      }
    }
  }, {
    foo: {
      value: function foo() {
        var _babelHelpers$get;

        babelHelpers.get(Object.getPrototypeOf(_Test), "foo", this).call(this);
        babelHelpers.get(Object.getPrototypeOf(_Test), "foo", this).apply(this, arguments);
        (_babelHelpers$get = babelHelpers.get(Object.getPrototypeOf(_Test), "foo", this)).call.apply(_babelHelpers$get, [this, "test"].concat(babelHelpers.slice.call(arguments)));
      }
    }
  });
  return _Test;
})(Foo);
