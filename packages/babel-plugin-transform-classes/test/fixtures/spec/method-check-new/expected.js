var Foo =
/*#__PURE__*/
function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "foo",
    value: function _foo() {
      babelHelpers.newMethodCheck(this, _foo);
      return 1;
    }
  }]);
  return Foo;
}();
