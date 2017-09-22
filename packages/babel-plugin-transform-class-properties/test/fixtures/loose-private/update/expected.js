var _foo;

var Foo =
/*#__PURE__*/
function () {
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
      babelHelpers.classPrivateFieldBase(this, _foo)[_foo]++;
      ++babelHelpers.classPrivateFieldBase(this, _foo)[_foo];
      babelHelpers.classPrivateFieldBase(other.obj, _foo)[_foo]++;
      ++babelHelpers.classPrivateFieldBase(other.obj, _foo)[_foo];
    }
  }]);
  return Foo;
}();

_foo = babelHelpers.classPrivateFieldKey("foo");
