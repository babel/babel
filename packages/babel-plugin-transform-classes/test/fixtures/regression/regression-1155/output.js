var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  function Foo(options) {
    babelHelpers.classCallCheck(this, Foo);
    var parentOptions = {};
    parentOptions.init = function () {
      this;
    };
    return babelHelpers.callSuper(this, Foo, [parentOptions]);
  }
  babelHelpers.inherits(Foo, _Bar);
  return babelHelpers.createClass(Foo);
}(Bar);
