let Bar = /*#__PURE__*/babelHelpers.createClass(function Bar() {
  "use strict";

  babelHelpers.classCallCheck(this, Bar);
});
let Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    x: {
      break x;
      _this = babelHelpers.callSuper(this, Foo);
    }
    return babelHelpers.assertThisInitialized(_this);
  }
  babelHelpers.inherits(Foo, _Bar);
  return babelHelpers.createClass(Foo);
}(Bar);
expect(() => new Foo()).toThrow();
