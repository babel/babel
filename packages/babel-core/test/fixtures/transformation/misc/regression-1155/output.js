var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  var _super = babelHelpers.createSuper(Foo);
  function Foo(options) {
    babelHelpers.classCallCheck(this, Foo);
    var parentOptions = {};
    parentOptions.init = function () {
      this;
    };
    return _super.call(this, parentOptions);
  }
  return babelHelpers.createClass(Foo);
}(Bar);
