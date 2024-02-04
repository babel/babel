var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  function Foo(options) {
    babelHelpers.classCallCheck(this, Foo);
    var parentOptions = {};
    parentOptions.init = function () {
      this;
    };
    return babelHelpers.callSuper(this, Foo, [parentOptions]);
  }
  return babelHelpers.createClass(Foo);
}(Bar);
