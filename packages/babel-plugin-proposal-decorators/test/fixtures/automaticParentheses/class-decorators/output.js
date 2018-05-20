var Foo = babelHelpers.decorate([dec1(), dec2(), dec3(), dec4(), dec5()()], function (_initialize) {
  var Foo = function Foo() {
    "use strict";

    babelHelpers.classCallCheck(this, Foo);

    _initialize(this);
  };

  return {
    F: Foo,
    d: []
  };
});
