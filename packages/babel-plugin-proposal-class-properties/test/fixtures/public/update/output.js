var Foo =
/*#__PURE__*/
function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.defineProperty(this, "foo", 0);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      this.foo++;
      ++this.foo;
      other.obj.foo++;
      ++other.obj.foo;
    }
  }]);
  return Foo;
}();
