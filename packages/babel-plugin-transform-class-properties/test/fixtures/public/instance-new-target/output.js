var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.defineProperty(this, "a", void 0);
  babelHelpers.defineProperty(this, "b", () => void 0);
  babelHelpers.defineProperty(this, "c", function () {
    return new.target;
  });
  this.d = new.target;
});
