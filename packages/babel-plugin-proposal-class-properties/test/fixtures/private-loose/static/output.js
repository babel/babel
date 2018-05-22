var _bar;

var Foo =
/*#__PURE__*/
function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      return babelHelpers.classPrivateFieldBase(Foo, _bar)[_bar];
    }
  }], [{
    key: "test",
    value: function test() {
      return babelHelpers.classPrivateFieldBase(Foo, _bar)[_bar];
    }
  }]);
  return Foo;
}();

_bar = babelHelpers.classPrivateFieldKey("bar");
Object.defineProperty(Foo, _bar, {
  writable: true,
  value: "foo"
});
