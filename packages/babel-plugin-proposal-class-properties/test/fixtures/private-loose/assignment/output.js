var Foo =
/*#__PURE__*/
function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 0
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo] += 1;
      babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo] = 2;
      babelHelpers.classPrivateFieldLooseBase(other.obj, _foo)[_foo] += 1;
      babelHelpers.classPrivateFieldLooseBase(other.obj, _foo)[_foo] = 2;
    }
  }]);
  return Foo;
}();

var _foo = babelHelpers.classPrivateFieldLooseKey("foo");
