var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");

let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _bar, {
      writable: true,
      value: "bar"
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      return Object.prototype.hasOwnProperty.call(this, _bar);
    }
  }], [{
    key: "test",
    value: function test() {
      return Object.prototype.hasOwnProperty.call(Foo, _foo);
    }
  }]);
  return Foo;
}();

Object.defineProperty(Foo, _foo, {
  writable: true,
  value: "foo"
});
