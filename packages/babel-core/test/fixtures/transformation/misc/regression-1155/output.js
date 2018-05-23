var Foo =
/*#__PURE__*/
function (_Bar) {
  "use strict";

  function Foo(options) {
    babelHelpers.classCallCheck(this, Foo);
    var parentOptions = {};

    parentOptions.init = function () {
      this;
    };

    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this, parentOptions));
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
}(Bar);
