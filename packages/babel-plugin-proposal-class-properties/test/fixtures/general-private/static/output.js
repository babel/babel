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
      return babelHelpers.classPrivateFieldGet(Foo, _bar);
    }
  }], [{
    key: "test",
    value: function test() {
      return babelHelpers.classPrivateFieldGet(Foo, _bar);
    }
  }]);
  return Foo;
}();

_bar = new WeakMap();

_bar.set(Foo, "foo");
