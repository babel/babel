var Foo =
/*#__PURE__*/
function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "foo",
    value: function foo() {
      babelHelpers.newClassMethodCheck(this, Foo.prototype.foo);
      return 1;
    }
  }]);
  return Foo;
}();
