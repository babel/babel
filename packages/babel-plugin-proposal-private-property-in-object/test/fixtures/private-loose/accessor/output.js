var _A = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("A");

var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      get: _get_foo,
      set: _set_foo
    });
    Object.defineProperty(this, _A, {
      writable: true,
      value: void 0
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return Object.prototype.hasOwnProperty.call(other, _foo);
    }
  }]);
  return Foo;
}();

function _get_foo() {
  return babelHelpers.classPrivateFieldLooseBase(this, _A)[_A];
}

function _set_foo(v) {
  babelHelpers.classPrivateFieldLooseBase(this, _A)[_A] = v;
}
